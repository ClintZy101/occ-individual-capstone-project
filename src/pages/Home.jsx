import React, { useEffect, useState } from "react";
import Hero2 from "../components/home/Hero2";
import DiscountSection from "../components/home/DiscountSection";
import ShopByCategory from "../components/home/ShopByCategory";
import InfiniteSlide from "../components/carousel/InfiniteSlide";
import Subscribe from "../components/subscription/Subscribe";
import { products } from "../data/allproducts";
import Trending from "../components/trending-products/Trending";
import {motion} from 'framer-motion'
import { useAuthStore } from "../store/useAuthStore";


export default function Home() {
  const trendingProducts = products.slice(0, 4);
  const { user, token, tokenExpiry } = useAuthStore();
  useEffect(()=>{
console.log('User', user, 'token', token, 'tokenExpiry', tokenExpiry)
  },[])
  return (
    <motion.div 
    // initial={{ opacity: 0, scale: 0.9 }}
    // animate={{ opacity: 1, scale: 1 }}
    // exit={{ opacity: 0, scale: 0.9 }}
    // transition={{ duration: 0.5 }}
    className="bg-black tracking-widest -mt-12 ">

      {/*  Hero */}
      <Hero2 />

      {/* Trending Gallery */}
     
      <Trending products={trendingProducts} />

      {/*  Discounted Section */}
      <DiscountSection />

      <div className="h-[100px]" />

      {/* Category Section */}
      <ShopByCategory />
      <div className="h-[100px]"></div>

      {/* Selected Brands */}
      <InfiniteSlide />

      {/* Subscription Email */}
      <Subscribe />

    </motion.div>
  );
}
