import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'


const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true)
    const [errormsg,setErrorMsg] = useState(null)
    
    const name  = useRef(null)
    const email = useRef(null);
    const password = useRef(null)
    const dispatch = useDispatch()

    const toggleSignInForm = () => {
         setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
      console.log('clicked')
      const message =  checkValidData(email.current.value,password.current.value);
      setErrorMsg(message)

      if(message)return;
      
      //Sign In Sign Up Logic
      if(!isSignInForm){
        createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name.current.value
              }).then(() => {
                const {uid, email, displayName } = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName : displayName}))
                      
              }).catch((error) => {
                 setErrorMsg(error)
                // ...
              });
             console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
           setErrorMsg(errorCode + '-' + errorMessage)
          });

      }
      else{
         // Sign In logic
         signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode + "-" + errorMessage)
  });
      }

    }

  return (
    <div>
      <Header />
      <div className='absolute'>
      <img src='/bg-movie.jpg' className='h-screen object-cover'  alt='bg' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0  left-0 text-white rounded-lg bg-opacity-80'>
         <h1 className='font-bold text-white text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
         {!isSignInForm && 
        <input type='text' ref={name} placeholder='Full Name' className=' p-4 my-4 w-full bg-gray-700 rounded-md' />}
        <input type='text' ref={email} placeholder='Email Address' className=' p-4 my-4 w-full bg-gray-700 rounded-md' />
        <input type='password' ref={password} placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-md' />
        <p className='text-red-700 font-bold text-lg '>{errormsg}</p>

        <button onClick={handleButtonClick} className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            {isSignInForm ? "New to FilmiGPT? Sign Up Now" :
            "Already an user? Sign In Now!" }</p>
      </form>
    </div>
  )
}

export default Login
