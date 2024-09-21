import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MovieInfo from './MovieInfo'
import UserProfile from './UserProfile'


const Body = () => {

  const appRouter = createBrowserRouter([
     {
        path:'/',
        element: <Login />
     },
     {
        path:'/browse',
        element: <Browse />
     },
     {
      path:'/movieinfo',
      element:<MovieInfo />
     },
     {
      path:'/profile',
      element:<UserProfile />
     }
  ]);


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
