// ...existing code...
import React, { useContext } from 'react'
import { motion } from 'motion/react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, ease: 'easeOut' }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
}

const btnVariants = {
  hover: { scale: 1.03, y: -4 },
  tap: { scale: 0.98 }
}

const Buycredit = () => {
  const { user,backendurl,loadCreditsData,token,setShowLogin } = useContext(AppContext)
const navigate = useNavigate();


const initpay = async(order) =>{
  const options = {

key:import.meta.env.VITE_RAZORPAY_KEY_ID,
amount: order.amount,
currency: order.currency,
name: "credits payment",
description : "credit payment",
order_id : order.id,
receipt : order.receipt,
handler :async (response)=>{
  try {
const {data} = await axios.post(backendurl+"/api/user/verify-razor",response ,{headers :{token}})
if(data.success){
  loadCreditsData();
  navigate('/')
  toast.success("credit added")
}

    
  } catch (error) {
    toast.error(error.message)

    
  }
}
  }
const rzp = new window.Razorpay(options)
rzp.open();
}
const paymentRzorpay = async (planId) =>{
try {
  if(!user){
    setShowLogin(true);
  }
  const {data} =  await axios.post(backendurl +"/api/user/pay-razor",{planId},{headers :{token}});
if(data.success)
{
initpay(data.order)
}
} catch (error) {
  toast.error(error.message)
}
}
  return (
    <motion.div
      className='text-center min-h-[80vh] pt-14 mb-10'
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <motion.button
        variants={headerVariants}
        className='bg-white/95 text-zinc-800 px-8 py-3 rounded-full border border-gray-400'
        whileHover="hover"
        whileTap="tap"
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Our plans
      </motion.button>

      <motion.h1 variants={headerVariants} className='text-3xl text-zinc-800 font-bold mt-10 sm:mb-10'>
        Choose the plan
      </motion.h1>

      <motion.div className='flex flex-wrap justify-center gap-6 text-left' variants={containerVariants}>
        {plans.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260 }}
            className='bg-white/95 text-gray-600 text-center drop-shadow-sm border rounded-lg py-12 px-8 hover:shadow-lg cursor-pointer'
          >
            <motion.img
              src={assets.logo_icon}
              alt={item.id}
              width={40}
              className='mx-auto'
              whileHover={{ rotate: 6 }}
              transition={{ duration: 0.35 }}
            />
            <p className='mt-3 mb-1 font-semibold text-base'>{item.id}</p>
            <p className='mt-2 mb-2'>{item.desc}</p>
            <p className='mt-4'>
              <span className='text-3xl font-semibold'>${item.price}</span> / {item.credits} Credit
            </p>

            <motion.button onClick={()=>paymentRzorpay(item.id)}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => {}}
              className='mt-10 px-7 py-3 rounded-sm bg-zinc-800 text-white font-medium'
            >
              {user ? 'Purchase' : 'Get started'}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Buycredit