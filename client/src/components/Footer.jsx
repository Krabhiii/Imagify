import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex  justify-center items-center py-4 mt-20 gap-5  text-center'>

    <img src= {assets.logo} width={150}></img>
<p className='font-light flex-1 border-gray-400 pl-4 text-sm'>© 2025 Krabhi Pvt Ltd | All rights reserved
</p>
<div className='flex justify-center items-center gap-2 cursor-pointer'>
    <img src={assets.facebook_icon}></img>
     <img src={assets.instagram_icon}></img>
      <img src={assets.twitter_icon}></img>
</div>
    </div>
  )
}

export default Footer