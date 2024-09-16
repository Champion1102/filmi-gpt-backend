import React,{useEffect} from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser,removeUser } from '../utils/userSlice'
import { toggleGptSearchView } from '../utils/gptSlice'
import { SUPPORTED_LANGUAGES } from '../utils/constants'


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(store => store.user);

    const handleSignOut = () =>{
        signOut(auth).then(() => {

          }).catch((error) => {
            navigate("/error")
          });

    }

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName } = user;
              dispatch(addUser({uid: uid, email: email, displayName : displayName}));
              navigate('/browse')
            } else {
               dispatch(removeUser())
               navigate('/')
            }
          });
          
          //Unsubscribe when component unmounts
          return () => unsubscribe();
       },[])

       const handleGptSearchClick = () => {
          //Toggle GPT Search
          dispatch(toggleGptSearchView())
       }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 flex justify-between mb-0'>
        <img className=' w-44 bg-opacity-50 h-10 bg-black rounded'
         src='/logo.png'
         alt='logo' />
     {user && <div className='flex p-2'>
      <select>
        {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
      </select>
     <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>Ask Filmi</button>
    <img  className='w-12 h-12' src='/usericon.png' alt='usericon' />
    <button onClick={handleSignOut} className=' font-bold text-white'>Sign Out</button>
    </div>}
        
    </div> 
  )
}

export default Header
