// ...existing code...
import React from 'react'
import { motion } from 'motion/react'
import { assets, testimonialsData } from '../assets/assets'

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

const Testimonials = () => {
  return (
    <motion.div
      className='text-center items-center mt-20'
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 variants={itemVariants} className='text-4xl font-semibold text-zinc-900'>Customer Testimonials</motion.h2>
      <motion.p variants={itemVariants} className='mb-6 text-zinc-700'>What our Users are saying</motion.p>

      <div className='flex flex-wrap gap-6 mt-7 justify-center'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260 }}
            className='bg-white/20 p-8 rounded-lg shadow-md w-80 m-3 cursor-pointer'
          >
            <div className='flex items-start gap-4'>
              <motion.img
                src={testimonial.image}
                className='rounded-full w-14 h-14 object-cover'
                alt={testimonial.name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <div className='flex-1 text-left'>
                <h3 className="text-lg font-medium text-zinc-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <div className='flex items-center mt-2'>
                  {Array(testimonial.stars).fill().map((_, i) => (
                    <img key={i} src={assets.rating_star} className='w-4 h-4 mr-1' alt="star" />
                  ))}
                </div>
              </div>
            </div>

            <motion.p variants={itemVariants} className='mt-4 text-sm text-zinc-800'>
              {testimonial.text}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials 