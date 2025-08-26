import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import Generatebutton from '../components/Generatebutton'

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <Generatebutton />
    </div>
  )
}
export default Home