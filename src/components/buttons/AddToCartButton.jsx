import React from 'react'

export default function AddToCartButton({handleClick}) {
  return (
    <button 
    onClick={handleClick}
    className=' tracking-wide h-12 w-full sm:w-1/2 border border-white hover:bg-purple-700 hover:border-none '>Add To Cart</button>
  )
}
