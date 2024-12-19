import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function ProductInfoModal({item,openInfo, setOpenInfo}) {
  return (
    <div className={`${openInfo && 'w-screen h-screen bg-black bg-opacity-50 absolute top-0 grid place-items-center'}`}>
        {/* Model Contents */}
        <div className='bg-white rounded'>
            <IoClose  className='text-xl'/>
            <p>{item.title || 'Title'}</p>
            <p>{item.prod_info || 'product description'}</p>
        </div>
    </div>
  )
}
