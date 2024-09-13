import React from 'react'
import logo from '../utils/logo.png';

const Header = () => {
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img className=' w-44 bg-opacity-50 bg-black rounded'
         src={logo} 
         alt='logo' />
        
    </div>
  )
}

export default Header
