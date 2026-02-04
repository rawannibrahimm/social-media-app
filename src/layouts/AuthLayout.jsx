import React from 'react'
import connectImage from '../assets/Images/Connected world-amico-blue.png'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
      <section className='min-h-screen'>
        <div className="grid grid-cols-3 h-full min-h-screen">
          <div className="col-span-1 hidden md:flex p-3 items-center justify-center">
            <div className="img-holder">
              <img src={connectImage} alt="Connect" />
            </div>
          </div>
          <div className="col-span-3 md:col-span-2 flex justify-center items-center">
            <Outlet/>
          </div>
        </div>
      </section>
    </>
)
}
