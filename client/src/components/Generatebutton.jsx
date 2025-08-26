// ...existing code...
import React, { useContext } from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, ease: 'easeOut' }
  }
}

const titleVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'spring', stiffness: 260 } }
}

const Generatebutton = () => {
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
      className='text-center pb-16'
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h1 variants={titleVariants} className="mt-8 text-6xl font-normal">See the magic</motion.h1>

      <motion.button onClick={onClickHandler}
        variants={buttonVariants}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className='inline-flex text-xl gap-2 hover:scale-105 transition-all duration-500 bg-zinc-800 text-white text-sm rounded-full px-11 py-3 mt-10 items-center'
      >
        generate images
        <motion.img
          src={assets.star_icon}
          className='h-6'
          alt="star"
          whileHover={{ rotate: 20, scale: 1.05 }}
          transition={{ duration: 0.35 }}
        />
      </motion.button>
    </motion.div>
  )
}

export default Generatebutton