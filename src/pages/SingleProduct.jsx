import React, { useEffect, useState } from "react";
import useProduct from "../store/useProduct";
import { BiMinus, BiPlus } from "react-icons/bi";
import AddToCartButton from "../components/buttons/AddToCartButton";
import BuyNowButton from "../components/buttons/BuyNowButton";
import { refund_policy, shipping_info } from "../data/policies";
import { Link, useNavigate } from "react-router-dom";
import LinkBackButton from "../components/buttons/LinkBackButton";
import useCartStore from "../store/useCartLocalStorage";
import { IoStorefrontOutline } from "react-icons/io5";
import useSeller from "../store/useSeller";
import SuccessAddToCart from "../components/modals/SuccessAddToCart";
import { AnimatePresence } from "framer-motion";

export default function SingleProduct() {
  const { product } = useProduct();
  console.log(product);
  const { setCartIsOpen } = useCartStore();
  const [successNotificationIsOpen, setSuccessNotificationIsOpen] =
    useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState({
    prod_info: false,
    refund_policy: false,
    shipping_info: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProduct =
    product &&
    (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.prod_info.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.user.toLowerCase().includes(searchTerm.toLowerCase()));

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
    if (!product) {
      console.error("No product selected");
      return;
    }

    const updatedProduct = { ...product, quantity };
    addToCart(updatedProduct);
    setSuccessNotificationIsOpen(true);
    setTimeout(() => setSuccessNotificationIsOpen(false), 3000);
    setTimeout(() => setCartIsOpen(true), 1000);

    console.log("Product added to cart:", updatedProduct);
  };

  const { addToCart } = useCartStore();
  const { setSeller } = useSeller();
  const navigate = useNavigate();
  const navigateToSellerStore = () => {
    setSeller(product.user);
    navigate(`/shop/seller/${product.user.username}`);
  };

  const navigateToCheckout = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  // console.log(updatedProduct)
  return (
    <div className="flex space-x-10 -mt-12 pt-20 p-10 min-h-[900px] bg-black tracking-widest">
      <AnimatePresence>
        {successNotificationIsOpen && (
          <SuccessAddToCart
            onClose={() => setSuccessNotificationIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="w-1/2 text-white">
        {/* <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        {filteredProduct && (
          <>
            <div className="md:flex items-center justify-between">
              <h2 className="mb-5">{product.title}</h2>
              <span
                onClick={navigateToSellerStore}
                className="hover:animate-pulseGlow cursor-pointer rounded-full flex items-center justify-center p-2 transition"
              >
                <IoStorefrontOutline className="text-xl" />
              </span>
            </div>
            <img src={product.src} alt="" />
          </>
        )}
      </div>

      <div className="w-1/2 text-white ">
        {filteredProduct && (
          <>
            <LinkBackButton text="Back To Shop" endpoint={"/shop"} />

            <h2 className=" text-xl ">{product.title}</h2>
            <h2 className="text-xl mb-5">${product.price}</h2>
            <p className="mb-5">{product.overview}</p>
            <p className="font-bold text-lg mb-2">Quantity</p>

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

            <div className=" mt-10">
              <AddToCartButton handleClick={handleAddToCart} />

              {/* <BuyNowButton handleClick={navigateToCheckout} /> */}
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
          </>
        )}
      </div>
    </div>
  );
}
