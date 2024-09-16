import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
            <img src='./bgpixel.jpg' alt='bg' className='' />
        </div>
       <GptSearchBar />
       <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch
