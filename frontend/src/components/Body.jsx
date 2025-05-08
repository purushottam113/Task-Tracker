import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const Body = () => {
  return (
    <>
        <Navbar/>
        <div className='flex justify-center md:w-1/2 m-auto'>
          <Outlet/>
        </div>
    </>
  )
}

export default Body
