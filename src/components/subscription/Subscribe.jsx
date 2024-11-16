import React from 'react'

export default function Subscribe() {
  return (
    <form className='text-white mt-20 pb-20 grid gap-5 px-5 w-[500px]'>
        <h2>SIGN UP TO RECEIVE UPDATES ON NEW PRODUCTS AND SPECIAL OFFERS</h2>
        <label htmlFor="email">EMAIL *</label>
        <input name='email' type="email" placeholder='Enter Your Email' className='border border-gray-500  h-10 bg-transparent hover:border-white px-2  outline-none' />
        <div className='flex items-center space-x-6'>
            <input type="checkbox" className='hover:cursor-pointer'/>
            <span>Yes, subscribe me to your newsletter.</span>
            <button type='submit' className='border border-white h-10 hover:border-none hover:bg-purple-600 w-[300px] transition duration-300'>Submit</button>
        </div>
        
    </form>
  )
}
