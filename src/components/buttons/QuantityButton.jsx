import React from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'

export default function QuantityButton({handleDecrement, handleIncrement, quantity,id}) {
  return (
    <div className="flex space-x-4 items-center border-white border w-max ">
              <span
                onClick={handleDecrement}
                className="cursor-pointer hover:bg-white hover:text-black w-10 h-10 grid place-items-center transition duration-300"
              >
                <BiMinus />
              </span>
              <span>{quantity}</span>
              <span
                onClick={handleIncrement}
                className="cursor-pointer hover:bg-white hover:text-black w-10 h-10 grid place-items-center transition duration-300"
              >
                <BiPlus />
              </span>
            </div>
  )
}
