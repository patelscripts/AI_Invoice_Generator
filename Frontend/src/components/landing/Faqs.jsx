import React, { useState } from 'react'
import { FAQS } from '../../utils/data'
const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) =>{
    setOpenIndex(openIndex === index ? null : index);
  }
  return <section id='faq' className='py-20 lg:py-28 bg-white'>
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='text-center mb-18'>
        <h2 className=''>Frequently Asked Questions</h2>
        <p className=''>Everything you need to know about the product and billing.</p>
      </div>
    </div>
  </section>
}

export default Faqs
