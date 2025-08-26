import React, { useContext, useState } from 'react'
import{assets} from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
 const {user,setShowLogin,logout,credit} = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center py-5 px-6 bg-white-50 ">
  {/* Left: Logo */}
  <Link to="/">
    <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 lg:w-40" />
  </Link>
<div>
 
  { user ? (
           <div className=" flex items-center gap-4">
      <button onClick={()=> navigate('/buy')} className='flex gap-2 items-center bg-blue-100 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full hover:scale-105 transition-all duration-700'>
        <img src= {assets.credit_star} className='w-4' />
        <p className='text-xs sm:text-sm font-medium'>Credit left :{credit}</p>
      </button>
      <p className='text-xs sm:text-sm font-normal max-sm:hidden' >Hi! {user.name} </p>
      <div className='relative group'>
        <img src= {assets.profile_icon} className='w-8 drop-shadow' />
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
          <ul className='list-none m-0 p-0 rounded-md'>
            <li className='p-0 py-0 cursor-pointer bg-white'onClick={logout}>Logout</li></ul>  

        </div>
      </div>
    </div>
          ) 
:
(
   <div className=" flex items-center gap-4">
      <p  onClick={()=>navigate('/buy')} className="cursor-pointer text-zinc-950  font-medium "> Pricing</p>
      <button className=" bg-zinc-800 text-white text-sm rounded-full px-8 py-2" onClick={()=>setShowLogin(true)} >Login</button>
    </div>
  ) }
  </div>
</div>

  )
}

export default Navbar