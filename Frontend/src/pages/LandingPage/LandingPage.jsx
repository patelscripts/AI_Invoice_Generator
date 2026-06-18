import React from 'react'
import Header from '../../components/landing/Header'
import Hero from '../../components/landing/Hero'
import Features from '../../components/landing/Features'
import TestiMonials from '../../components/landing/TestiMonials'
import Faqs from '../../components/landing/Faqs'
import Footer from '../../components/landing/Footer'

const LandingPage = () => {
  return (
    <div className='bg-[#ffffff] text-gray-600 '>
        <Header/>
        <main>
          <Hero/>
          <Features/>
          <TestiMonials/>
          <Faqs/>
          <Footer/>
        </main>
    </div>
  )
}

export default LandingPage
