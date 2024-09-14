import React,{useEffect} from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser,removeUser } from '../utils/userSlice'


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

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className=' w-44 h-10 bg-opacity-50 bg-black rounded'
         src='/logo.png'
         alt='logo' />
     {user && <div className='flex p-2'>
    <img  className='w-12 h-12' src='/usericon.png' alt='usericon' />
    <button onClick={handleSignOut} className=' font-bold text-white'>Sign Out</button>
    </div>}
        
    </div> 
  )
}

export default Header
