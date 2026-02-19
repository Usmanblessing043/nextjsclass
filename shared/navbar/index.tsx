import React from 'react'
import { BiAlignMiddle } from 'react-icons/bi'

const Navbar = () => {
  return (
    <div className='flex  items-center justify-between bg-[#fff] py-5 px-6'>
          <div className=''>
            <h2 className='text-2xl text-[#000] font-medium leading-2 tracking-wide'> SQI Class</h2>
          </div>
          <div className='hidden sm:flex justify-between gap-6 items-center'>
            <h1 className='text-[16px] text-[#000] font-medium'>Home</h1>
            <h1 className='text-[16px] text-[#000] font-medium'>About us</h1>
            <h1 className='text-[16px] text-[#000] font-medium'>Faqs</h1>
    
    
          </div>
          
            <BiAlignMiddle className='text-3xl text-[#000] sm:hidden' />
          
          <button className='px-[20px]  hover:bg-blue-700 hover:text-amber-50 py-2 border bg-amber-300  rounded-[10px] text-[#000] hidden md:block'>sign up</button>
        </div>
  )
}

export default Navbar