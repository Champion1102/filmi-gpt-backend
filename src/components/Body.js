import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MovieInfo from './MovieInfo'


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
     }
  ]);


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
