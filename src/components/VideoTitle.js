import React from 'react'
import { useSelector } from 'react-redux';


const VideoTitle = ({title, overview,}) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const handlePlayClick = () => {
    window.open(`https://www.youtube.com/watch?v=${trailerVideo?.key}`, '_blank')
  }


  return (
    <div className='w-screen aspect-video pt-[20%] p-6 md:px-24 absolute text-white bg-gradient-to-r from-black'> 
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/3'>{overview}</p>
        <div className='my-2 md:m-0'>
            <button className='bg-white text-black px-4 py-2 md:p-4 md:px-12 md:text-xl  rounded-lg hover:bg-opacity-80' onClick={handlePlayClick}>▶️Play</button>
            <button className= ' hidden md:inline-block mx-2 bg-white text-black p-2 md:p-4 md:px-12 md:text-xl rounded-lg hover:bg-opacity-80'>ℹ️ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle
