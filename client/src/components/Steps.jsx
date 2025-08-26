import React from 'react'
import { motion } from 'motion/react'
import { stepsData } from '../assets/assets'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const Steps = () => {
  return (
    <motion.div
      className='flex flex-col items-center text-center'
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h3 variants={itemVariants} className='text-3xl font-semibold'>How it works</motion.h3>
      <motion.p variants={itemVariants} className='text-balance mb-6'>Transform words into Stunning images</motion.p>

      <div className='space-y-4 w-full flex flex-col items-center'>
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className='flex gap-4 px-6 py-4 w-full max-w-3xl bg-white/20 border shadow-md cursor-pointer transition-all duration-300 rounded-lg'
          >
            <img src={item.icon} alt='' width={32} className='mt-2' />
            <div className='flex flex-col gap-1'>
              <h2 className='text-base text-zinc-900 font-semibold text-left'>{item.title}</h2>
              <p className='text-sm text-zinc-700 text-left break-words'>{item.description}</p>
            </div>
          </motion.div>
               ))}
      </div>
    </motion.div>
  )
}
export default Steps