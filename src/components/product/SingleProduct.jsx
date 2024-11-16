import React, { useState } from "react";
import useProduct from "../../store/useProduct";
import {  BiMinus, BiPlus } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import AddToCartButton from "../buttons/AddToCartButton";
import BuyNowButton from "../buttons/BuyNowButton";
import { refund_policy, shipping_info } from "../../data/policies";
import { Link } from "react-router-dom";
// import useCartStore from "../../store/useCart";
import LinkBackButton from "../buttons/LinkBackButton";
import useCartStore from "../../store/useCartLocalStorage";

export default function SingleProduct() {
  const { product, setProduct } = useProduct();
  const [quantity,setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState({
    prod_info: false,
    refund_policy: false,
    shipping_info: false,
  });
  // console.log(product)
  const toggleInfo = (property) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  // Handle quantity increment and decrement
  const handleDecrement = () => {
    setQuantity((prevQty) => Math.max(prevQty - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  // Prepare updated product and add it to cart
  const handleAddToCart = () => {
    const updatedProduct = { ...product, quantity };
    addToCart(updatedProduct);
    console.log(updatedProduct)
  };

  const {addToCart} = useCartStore();

  // console.log(updatedProduct)
  return (
    <div className="flex space-x-10 -mt-10 pt-20 p-10 min-h-[900px] bg-black tracking-widest">
      <div className="w-1/2 text-white">
        <h2 className="mb-5">{product.title}</h2>
        <img src={product.src} alt="" />
      </div>

      <div className="w-1/2 text-white ">
      {/* <Link to={'/shop'}>
        <div className="flex space-x-2 items-center text-right justify-end mb-4 ">
          <FaArrowLeft />
          <h2>Back to Shop</h2>
        </div>
        </Link> */}
        <LinkBackButton text="Back To Shop" endpoint={"/shop"} />

        <h2 className=" text-xl ">{product.title}</h2>
        <h2 className="text-xl mb-5">${product.price}</h2>
        <p className="mb-5">{product.overview}</p>
        <p className="font-bold text-lg mb-2">Quantity</p>

        <div className="flex space-x-4 items-center border-white border w-max ">
          <span 
          onClick={handleDecrement}
          className="cursor-pointer hover:bg-white hover:text-black w-10 h-10 grid place-items-center transition duration-300">
            <BiMinus />
          </span>
          <span>{quantity}</span>
          <span 
          onClick={handleIncrement}
          className="cursor-pointer hover:bg-white hover:text-black w-10 h-10 grid place-items-center transition duration-300">
            <BiPlus />
          </span>
        </div>
        {/* Buttons */}
        <div className=" sm:space-x-2 mt-10 grid gap-5 sm:flex">
          <AddToCartButton  handleClick={handleAddToCart}/>
          <BuyNowButton />
        </div>

        {/* Product Info */}
        <div className="border-b-white  border-b py-2 mt-10">
          <div
            onClick={() => toggleInfo("prod_info")}
            className="flex justify-between items-center mt-5 cursor-pointer"
          >
            <h2 className=" uppercase mb-2">Product Info</h2>
            {isOpen.prod_info ? (
              <BiMinus className="text-xl" />
            ) : (
              <BiPlus className="text-xl" />
            )}
          </div>
          <p className={`${isOpen.prod_info ? "flex" : "hidden"}`}>
            {product.prod_info}
          </p>
        </div>
        {/* Refund Policy */}
        <div className="border-b-white  border-b py-2">
          <div
            onClick={() => toggleInfo("refund_policy")}
            className="flex justify-between items-center mt-5 cursor-pointer"
          >
            <h2 className=" uppercase mb-2">Return and Refund Policy</h2>
            {isOpen.refund_policy ? (
              <BiMinus className="text-xl" />
            ) : (
              <BiPlus className="text-xl" />
            )}
          </div>
          <p className={`${isOpen.refund_policy ? "flex" : "hidden"}`}>
            {refund_policy}
          </p>
        </div>
        {/* Shipping Info */}
        <div className="border-b-white  border-b py-2">
          <div
            onClick={() => toggleInfo("shipping_info")}
            className="flex justify-between items-center mt-5 cursor-pointer"
          >
            <h2 className=" uppercase mb-2">Shipping Info</h2>
            {isOpen.shipping_info ? (
              <BiMinus className="text-xl" />
            ) : (
              <BiPlus className="text-xl" />
            )}
          </div>
          <p className={`${isOpen.shipping_info ? "flex" : "hidden"}`}>
            {shipping_info}
          </p>
        </div>
      </div>
    </div>
  );
}
