import React, { useEffect, useState } from "react";
import Hero2 from "../components/home/Hero2";
import DiscountSection from "../components/home/DiscountSection";
import ShopByCategory from "../components/home/ShopByCategory";
import InfiniteSlide from "../components/carousel/InfiniteSlide";
import Subscribe from "../components/subscription/Subscribe";
import { products } from "../data/allproducts";
import Trending from "../components/trending-products/Trending";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import ReceivedEmail from "../components/modals/ReceivedEmail";

export default function Home() {
  const trendingProducts = products.slice(0, 4);
  const { user, token, tokenExpiry } = useAuthStore();
  const [email, setEmail] = useState("");
  const [renderReceivedEmail, setRender] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setRender(true);
      setTimeout(() => {
        setRender(false);
        navigate("/shop");
      }, 2000);
     
      console.log("email submit:", email);
    }
  };
  // useEffect(() => {
  //   console.log(
  //     "User",
  //     user,
  //     "token",
  //     token,
  //     "tokenExpiry",
  //     new Date(tokenExpiry)
  //   );
  // }, []);
  return (
    <motion.div className="bg-black tracking-widest -mt-12 ">
      {renderReceivedEmail && <ReceivedEmail />}

      <Hero2 />

      <Trending products={trendingProducts} />

      <DiscountSection />

      <div className="h-[100px]" />
      <ShopByCategory />
      <div className="h-[100px]"></div>

      <InfiniteSlide />

      <Subscribe handleSubmit={handleSubmit} setEmail={setEmail} />
    </motion.div>
  );
}
