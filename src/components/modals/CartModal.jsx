import React from "react";
import useCartStore from "../../store/useCartLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CiTrash } from "react-icons/ci";

export default function CartModal({ isOpen, onClose }) {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getTotalPrice,
    getItemTotalPrice,
  } = useCartStore();

  const navigate = useNavigate();

  const handleClick = () => {
    onClose();
    navigate("/checkout");
  };
  console.log(cartItems);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[300px] bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-[9999] flex flex-col`}
    >
      {/* Header */}
      <div className="p-5 bg-black text-white flex justify-between items-center fixed top-0 w-full sm:w-[300px] z-[10000]">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button
          className="text-xl font-bold hover:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      {/* Cart Items */}
      <div className="mt-[60px] mb-[120px] p-5 overflow-y-auto flex-1 ">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="border-b border-b-gray-500 py-4 ">
              <div className="flex items-center justify-between mb-4  pb-2">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1 ml-4">
                  <p className="font-bold text-gray-700">{item.title}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-700">
                    ${item.quantity * item.price}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                {/* Quantity Control */}
                <div className="flex space-x-4 items-center border-gray-700 border w-max ">
                  <span
                    onClick={() => decrementQuantity(item._id)}
                    className="cursor-pointer hover:bg-black hover:text-white w-8 h-8 grid place-items-center transition duration-300"
                  >
                    <BiMinus />
                  </span>
                  <span>{item.quantity}</span>
                  <span
                    onClick={() => incrementQuantity(item._id)}
                    className="cursor-pointer hover:bg-black hover:text-white w-8 h-8 grid place-items-center transition duration-300"
                  >
                    <BiPlus />
                  </span>
                </div>
                <span>
                  <CiTrash
                    onClick={() => removeFromCart(item._id)}
                    className="text-xl hover:text-red-500 cursor-pointer"
                  />
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 bg-black text-white fixed bottom-0 w-full sm:w-[300px]">
        <div className="flex justify-between mb-3">
          <p>Total:</p>
          <p>${getTotalPrice().toFixed(2)}</p>
        </div>

        <button
          onClick={handleClick}
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-400"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
