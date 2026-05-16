import React from 'react'
import Header from '../../components/landing/Header'
import Hero from '../../components/landing/Hero'
import Features from '../../components/landing/Features'
import TestiMonials from '../../components/landing/TestiMonials'

const LandingPage = () => {
  return (
    <div className='bg-[#ffffff] text-gray-600 '>
        <Header/>
        <main className='mb-[100vh]'>
          <Hero/>
          <Features/>
          <TestiMonials/>
        </main>
    </div>
  )
}

export default LandingPage
