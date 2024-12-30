import React from 'react'

export default function BuyNowButton({handleClick}) {
  return (
    <button onClick={handleClick} className=' tracking-wide h-12 w-full sm:w-1/2 bg-white text-black hover:text-white hover:border-white hover:bg-black hover:border'>Buy Now</button>
  )
}
