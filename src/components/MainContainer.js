import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = () => {
   const movies = useSelector((store) => store.movies?.nowPlayingMovies)
   if (!movies || movies.length === 0) return null; // Ensure movies is not empty
   console.log("hello",movies)

   const mainMovie = movies[0]
   const {original_title,overview,id} = mainMovie;
  return (
    <div className='md:pt-0  pt-[20%] bg-black'>
       <VideoTitle title={original_title}  overview={overview} />
       <VideoBackground id={id} />
    </div>
  )
}

export default MainContainer
