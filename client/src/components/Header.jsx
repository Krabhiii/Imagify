// ...existing code...
import React, { useContext } from 'react'
import { motion } from "motion/react"
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
      ease: 'easeOut'
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const Header = () => {
    const{user,setShowLogin} = useContext(AppContext);
    const navigate = useNavigate();

    const onClickHandler = ()=>{
if(user){
    navigate('/result')
}
else{
    setShowLogin(true)
}


    }
  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-20 px-4'
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className='flex px-6 py-1 rounded-full bg-white items-center gap-2 text-zinc-900 text-sm border border-neutral-500'
        aria-hidden
      >
        <p>Best text to Image generator</p>
        <motion.img src={assets.star_icon} alt="star" className='w-5' whileHover={{ rotate: 20 }} transition={{ type: 'spring', stiffness: 200 }} />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mt-8 text-6xl font-normal max-sm:text-4xl leading-tight"
      >
        Turn text to<br /><motion.span className='text-blue-600 cursor-pointer' whileHover={{ scale: 1.02 }}>{'image'}</motion.span>, in seconds.
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="font-medium text-center leading-snug mt-6 max-w-2xl"
      >
        🎨 Imagine it. ✍️ Type it. 🔮 Watch the magic unfold in seconds.
        Unleash your creativity with AI & turn dreams into visual art!
      </motion.p>

      <motion.button onClick={onClickHandler}
        variants={itemVariants}
        className='flex justify-center items-center mt-8 bg-zinc-900 text-white px-6 py-2 rounded-full gap-2 shadow-lg'
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <p className='gap-5'>Generate images</p>
        <motion.img className='w-5' src={assets.star_group} alt="generate" whileHover={{ rotate: 12 }} transition={{ duration: 0.4 }} />
      </motion.button>

      <motion.div
        variants={itemVariants}
        className='flex flex-wrap gap-3 justify-center mt-9'
      >
        {Array(6).fill('').map((item, index) => (
          <motion.img
            key={index}
            className='w-12 hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt={`sample-${index}`}
            whileHover={{ scale: 1.08, rotate: index % 2 === 0 ? -3 : 3 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        ))}
      </motion.div>

      <motion.p
        variants={itemVariants}
        className='flex justify-center text-center mt-4'
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  )
}

export default Header
// ...existing code...