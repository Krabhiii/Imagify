// ...existing code...
import React from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.06, ease: 'easeOut' }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const Description = () => {
  return (
    <motion.div
      className='text-center items-center mt-20'
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants} className='text-zinc-900 font-semibold text-4xl'>
        Create Ai images
      </motion.h1>

      <motion.p variants={itemVariants} className='mt-1'>
        Turn your imagination into visuals
      </motion.p>

      <div className='flex justify-center items-center gap-0 '>
        <div className='flex justify-center items-center gap-4 flex-wrap mt-3'>
          <motion.img
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220 }}
            className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 h-auto mb-0 rounded-lg shadow-md'
            src={assets.sample_img_1}
            alt='AI Sample'
          />

          <motion.div
            variants={itemVariants}
            className='max-w-md text-left'
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='font-semibold text-2xl leading-tight mt-0'>
              Introduction to AI-Powered Image Generator
            </h2>
            <p className='text-sm mt-1 text-gray-900 font-medium'>
              Our intelligent engine interprets your words and transforms them into vivid, high-quality images.
              <br />
              Whether you're crafting fantasy worlds or designing sleek product mockups, the possibilities are endless.
              <br />
              No design skills? No problem. Just describe your vision — we'll handle the pixels.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
// ...existing