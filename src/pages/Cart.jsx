import React, { useEffect, useState } from "react";
// import useCartStore from "../store/useCart";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CiCircleInfo, CiTrash } from "react-icons/ci";
import LinkBackButton from "../components/buttons/LinkBackButton";
import { shipping_info } from "../data/policies";
import useCartStore from "../store/useCartLocalStorage";

export default function Cart() {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getTotalPrice,
    getItemTotalPrice,
  } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const [shippingFee, setShippingFee] = useState(10)
  const total = (getTotalPrice() + shippingFee).toFixed(2);
  const freeShippingThreshhold = 1000


  useEffect(()=>{
    if(total > freeShippingThreshhold){
      setShippingFee(0)
    } else if(total< freeShippingThreshhold){
      setShippingFee(10)
    }
  },[getTotalPrice()])

  return (
    // cart container
    <div className="grid lg:flex gap-5  bg-black -mt-10 pt-[100px] pb-[100px] text-white">
      {/* product details */}
      <div className="w-3/4  md:grid px-5">
        <h2 className="text-xl text-center mb-5">My Cart</h2>
        {cartItems.length === 0 && (
          <div className="w-full grid place-items-center gap-5">
            <h2 className="w-full text-center text-2xl">
              Your Cart is Empty. Add Products into it.
            </h2>
            <LinkBackButton text="Back To Shop" endpoint={"/shop"} />
          </div>
        )}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid gap-2   md:flex md:space-x-10 items-center border-y border-y-gray-700 py-2 my-2  px-5"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-[150px] h-[150px]"
            />
            <div>
              <p className="">{item.title}</p>
              <p className="text-lg text-purple-500">${item.price}</p>
            </div>

            <div className="flex space-x-10 justify-between items-center  w-full ">
              {/* Quantity Control */}
              <div className="flex space-x-4 items-center border-gray-700 border w-max ">
                <span
                  onClick={() => decrementQuantity(item.id)}
                  className="cursor-pointer hover:bg-white hover:text-black w-10 h-10 grid place-items-center transition duration-300"
                >
                  <BiMinus />
                </span>
                <span>{item.quantity}</span>
                <span
                  onClick={() => incrementQuantity(item.id)}
                  className="cursor-pointer hover:bg-white hover:text-black w-10 h-10 grid place-items-center transition duration-300"
                >
                  <BiPlus />
                </span>
              </div>

              <span className="text-xl">${item.price * item.quantity}</span>
              <span
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer "
              >
                {" "}
                <CiTrash className="text-3xl hover:text-red-500 text-gray-500" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* order summary */}
      <div className="lg:w-1/4 w-full px-5">
        <h2 className="text-2xl mb-2">Order Summary</h2>
        <div className="border-y border-y-gray-700 py-10 grid gap-5">
          <div className="flex items-center justify-between w-full ">
            <p className="text-xl">Subtotal</p>
            <p className="text-xl">${getTotalPrice().toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between w-full ">
            <p className="text-xl">Shipping Fee</p>
            <p>${shippingFee.toFixed(2)}</p>
          </div>
          {/* Shipping info and availability */}
          <div className="border-y-gray-700  border-y py-1  items-center">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-between items-center  cursor-pointer"
            >
              <h2 className=" uppercase ">Shipping Availability</h2>
              {isOpen ? (
                <BiMinus className="text-xl" />
              ) : (
                <BiPlus className="text-xl" />
              )}
            </div>
            <div className={`${isOpen ? "grid gap-5 mt-2" : "hidden"}`}>
              {shipping_info}
              <div className="bg-purple-300 p-3 text-center grid place-items-center  rounded relative  ">
                <CiCircleInfo className="text-[50px] text-gray-100 w-full  absolute " />
                <p className="text-purple-500 z-10 font-mono">
                  Shipping available to any part of the Philippines
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 mb-10">
          <h1 className="text-2xl">Total</h1>
          <p className="text-2xl text-purple-500">${total}</p>
        </div>
        <button className="px-5 py-2 bg-purple-500 w-full hover:bg-purple-700 text-xl">Checkout</button>
      </div>
    </div>
  );
}
