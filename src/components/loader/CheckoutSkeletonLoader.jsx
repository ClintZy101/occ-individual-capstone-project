import React from 'react';

const CheckoutSkeletonLoader = () => {
  return (
    <div className="-mt-12 grid justify-center lg:flex gap-5 bg-black pt-[100px] pb-[100px] text-white animate-pulse">
      {/* product details */}
      <div className="md:w-3/4 md:grid px-5 w-screen">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-5"></div>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="grid gap-2 md:grid-cols-5 items-center md:border-y border-b border-y-gray-700 py-4 my-2 px-5"
          >
            <div className="w-[150px] h-[150px] bg-gray-700 rounded"></div>
            <div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="flex space-x-10 justify-between items-center w-full md:col-span-3">
              <div className="flex space-x-4 items-center border-gray-700 border w-max">
                <div className="w-10 h-10 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-6"></div>
                <div className="w-10 h-10 bg-gray-700 rounded"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="w-10 h-10 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* order summary */}
      <div className="lg:w-1/4 w-full px-5">
        <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="border-y border-y-gray-700 py-10 grid gap-5">
          <div className="flex items-center justify-between w-full">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="border-y-gray-700 border-y py-1 items-center">
            <div className="flex justify-between items-center cursor-pointer">
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-6"></div>
            </div>
            <div className="grid gap-5 mt-2">
              <div className="bg-gray-700 p-3 text-center grid place-items-center rounded relative h-20"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 mb-10">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
};

export default CheckoutSkeletonLoader;
