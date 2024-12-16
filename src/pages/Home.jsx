import React, { useEffect, useState } from "react";
import Hero2 from "../components/home/Hero2";
import Gallery from "../components/gallery/Gallery";
import DiscountSection from "../components/home/DiscountSection";
import ShopByCategory from "../components/home/ShopByCategory";
import InfiniteSlide from "../components/carousel/InfiniteSlide";
import Subscribe from "../components/subscription/Subscribe";
import Footer from "../components/footer/Footer";
import { products } from "../data/allproducts";
import Trending from "../components/trending-products/Trending";


export default function Home() {
  const trendingProducts = products.slice(0, 4);

  return (
    <div className="bg-black tracking-widest -mt-12 ">

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

    </div>
  );
}
