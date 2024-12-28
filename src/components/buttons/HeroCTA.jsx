import React from 'react'

export default function HeroCTA({text="Shop Now", Icon}) {
  return (
    <button className=' hover:animate-pulseGlow group flex  items-center justify-center font-mono h-[40px] w-[200px] bg-black text-white px-5 hover:scale-105  transition-all duration-500 uppercase cursor-pointer mx-auto'>
        <p className='group-hover:scale-75 transition-all duration-500'>
            {text}
        </p>
        {<Icon  className="  text-3xl  group-hover:rotate-45 group-hover:scale-150  transition duration-500"/>}
    </button>
  )
}
