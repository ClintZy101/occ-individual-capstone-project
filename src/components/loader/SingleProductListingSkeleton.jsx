import React from "react";
import { motion } from "framer-motion";

export default function SingleProductSkeleton() {
  return (
    <div className="grid gap-5 grid-cols-5 border-t-[0.5px] border-t-gray-500 py-2 px-2">
      {/* Image Skeleton */}
      <div className="w-[150px] h-[150px] bg-gray-700 rounded-md animate-pulse"></div>
      
      {/* Title & Price Skeleton */}
      <div>
        <div className="w-16 h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="w-28 h-6 bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="w-20 h-6 bg-gray-700 rounded-md animate-pulse"></div>
      </div>
      
      {/* Category Skeleton */}
      <div>
        <div className="w-16 h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="w-24 h-6 bg-gray-700 rounded-md animate-pulse"></div>
      </div>
      
      {/* Stock Skeleton */}
      <div>
        <div className="w-24 h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="w-12 h-6 bg-gray-700 rounded-md animate-pulse"></div>
      </div>
      
      {/* Options Skeleton */}
      <div className="justify-self-end relative">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
