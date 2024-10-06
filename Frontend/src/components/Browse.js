import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import { useSelector } from 'react-redux'
import GptSearch from './GptSearch'

const Browse = () => {
   const showGptSearch = useSelector(store => store.gpt.showGptSearch);

   useNowPlayingMovies()
   usePopularMovies()
   useTopRatedMovies()
   useUpcomingMovies()

  return (
    <div className="min-h-screen">
     <Header className='w-full' />
     {
      showGptSearch ? <GptSearch  className=' bg-black' /> : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )
     }
    </div>
  )
}

export default Browse