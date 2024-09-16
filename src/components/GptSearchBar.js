import React from 'react'

const GptSearchBar = () => {
  return (
    <div className='pt-[5%] flex justify-center'>
       <form className='w-1/2  bg-black grid grid-cols-12 rounded-lg'> 
           <input type='text' className=' p-4 m-4 col-span-9 rounded-lg
            ' placeholder='Confused about what to watch? Ask FILMI!' />
           <button className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4" >Ask IT</button>
       </form>
    </div>
  )
}

export default GptSearchBar
