import React from 'react'
import Header from './Header'
import useNowPlayMovies from '../hooks/useNowPlayMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import { useSelector } from 'react-redux';
import GPTsearchPage from './GPTsearchPage';




const Browse = () => {
  const showGptSearch= useSelector((store)=> store.gpt.showGptSearch);

  useNowPlayMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();


  return (
    <div>
      <Header/>
      {
        showGptSearch ? <GPTsearchPage/> :
         <>
          <MainContainer/>
          <SecondaryContainer/>
        </>
      }
     
    </div>
  );
};

export default Browse
