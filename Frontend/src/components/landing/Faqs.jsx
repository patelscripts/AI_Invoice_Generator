import React, { useState } from 'react'
import { FAQS } from '../../utils/data'
const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) =>{
    setOpenIndex(openIndex === index ? null : index);
  }
  return (
    <div>
      
    </div>
  )
}

export default Faqs
