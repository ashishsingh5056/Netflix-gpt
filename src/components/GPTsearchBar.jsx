import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstant'
import openai from '../utils/openAi';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const GPTsearchBar = () => {
  const dispatch=useDispatch();
  const langKey= useSelector((store)=>store.config.lang);
  const searchText= useRef(null)
      
  // search on TMDB
    const searchMovieTMDB= async(movie)=>{
      const data= await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS)
      const json=await data.json();
      return json.results;

    }  ;

  const handleGPTsearch= async()=>{
    console.log(searchText.current.value);
    // Make an API call to GPT API  TO GET MOVIES results
   
     const gptQuery="Act as a Movie Recommandation system and suggest some movies for the query : "
             + searchText.current.value +
                  ". only give me names of 5 movies ,comma seperated like the example result given ahead. Example :Golmal, Singham, Pathan, Dhoom-3, Hero";

    const GptResults= await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    console.log(GptResults.choices?.[0]?.message.content);
    // Golmal, Singham, Pathan, Dhoom-3, Hero

    const gptMovies=GptResults.choices?.[0]?.message.content.split(",");
    // [Golmal, Singham, Pathan, Dhoom-3, Hero]

    // for each movie I will search TMDB API

    const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie));
    // [promise,promise,promise,promise,promise]
    const tmdbResults= await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResults({movieNames: gptMovies, movieResults:tmdbResults}));
    

  };
  return (
    <div className='pt-[45%] md:pt-[10%] flex justify-center'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
        <input ref={searchText} type="text"
         className=' m-4 p-4 col-span-9' 
         placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='col-span-3 m-4 py-2 px-4 rounded-lg bg-red-700 text-white' onClick={handleGPTsearch}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GPTsearchBar
