import React from 'react'
import Header from '../../components/landing/Header'
import Hero from '../../components/landing/Hero'
import Features from '../../components/landing/Features'
import TestiMonials from '../../components/landing/TestiMonials'
import Faqs from '../../components/landing/Faqs'

const LandingPage = () => {
  return (
    <div className='bg-[#ffffff] text-gray-600 '>
        <Header/>
        <main className='mb-[100vh]'>
          <Hero/>
          <Features/>
          <TestiMonials/>
          <Faqs/>
        </main>
    </div>
  )
}

export default LandingPage
