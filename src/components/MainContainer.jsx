
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = () => {

  const movies = useSelector((store) =>store.movies?.nowPlayingMovies)
 
  if(!movies) return;

  const mainMovie= movies[0];
  // console.log(mainMovie);

  const {original_title, overview,id}= mainMovie;

  
  return (
    <>
       <div className='md:pt-0 bg-black pt-[30%] '>
       <VideoTitle  title={original_title} overview={overview}/> 
       <VideoBackground movieId={id}/>
      
       </div>
    </>
  )
};

export default MainContainer
