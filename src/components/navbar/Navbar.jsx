import React from "react";
import { BsCart } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartLocalStorage";
// import useCartStore from "../../store/useCart";

export default function Navbar({ bannerIsHidden }) {
  const { cartItems} = useCartStore();
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="sticky top-0 z-50">
      {" "}
      <div
        className={`  ${
          bannerIsHidden ? "-translate-y-52" : " "
        } bg-black w-full h-10 text-center text-white flex  items-center justify-center  transform transition-transform duration-1000 ease-in-out`}
      >
        {" "}
        FREE 2-DAY SHIPPING FOR ORDERS OF $1000 OR MORE
      </div>
      {/* main navbar */}
      <div
        className={`${
          bannerIsHidden ? "-translate-y-8" : ""
        } rounded-xl w-5/6 h-10 bg-white text-black bg-opacity-80 flex justify-between  mx-auto px-5  items-center   transform transition-transform duration-500 ease-in-out shadow-md`}
      >
        <div>MyShop</div>
        <div className="flex space-x-8 uppercase">
          <Link to={"/"}>
            <span className="hover:underline cursor-pointer">Home</span>
          </Link>
          <Link to={"/shop"}>
            <span className="hover:underline cursor-pointer">Shop</span>
          </Link>
          <span className="hover:underline cursor-pointer">Sale</span>
        </div>
        <div className="space-x-3 flex items-center">
          <span>Login</span>
          <Link to={"/cart"}>
          <span className="relative grid place-items-center">
            <BsCart className="text-xl" />
            <span className="rounded-full absolute -right-2 -top-2 bg-black w-4 h-4 text-xs text-white grid place-items-center">{cartItems.length === 0 ? '0': totalQuantity}</span>
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
