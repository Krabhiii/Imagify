import React, { useContext } from "react";
import { Routes,Route } from "react-router-dom";
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Buycredit from "./pages/Buycredit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
export default function App() {
  const {showLogin} = useContext(AppContext)
  return (
    <div className=" w-full px-4 sm:px-10 md:px-14 lg:px-40 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 m-0">
      <ToastContainer position="bottom-right" />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/result" element={ <Result />} />
        <Route path="/buy" element={ <Buycredit />} />
      </Routes>
      <Footer />
    </div>
  )
}

/*import React from 'react'
import { motion } from "motion/react"
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20 '>
        <div className='flex  px-6 py-1 rounded-full bg-white items-center gap-2 text-zinc-900 text-sm border border-neutral-500'>
            <p>Best text to Image generator</p>
            <img src={assets.star_icon} ></img>
        </div>
       <h1 className=" mt-8 text-6xl font-normal">
            Turn text to<br></br><span  className='text-blue-600 cursor-pointer'>image</span>,in seconds.
        </h1>
        <p className=" font-medium text-center leading-snug mt-6">
  🎨 Imagine it. ✍️ Type it. 🔮 Watch the magic unfold in seconds.<br />
  Unleash your creativity with AI & turn dreams into visual art!
</p>
<button className='flex  justify-center items-center mt-8 bg-zinc-900 text-white px-6 py-2 rounded-full gap-2'>
    <p className='gap-5'>Generate images</p>
    <img  className = 'w-5'src = {assets.star_group} ></img>
</button>
<div className= 'flex flex-wrap gap-3 justify-center mt-9'>
    {Array(6).fill('').map((item,index)=>(
        <img className=' w-12 rounded-none hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src = {index%2 === 0 ? assets.sample_img_2 : assets.sample_img_1} key={index} ></img>
    ))}
</div>
<p className='flex justify-center text-center mt-4'>Generated images from imagify</p>
    </motion.div>
  )
}

export default Header*/