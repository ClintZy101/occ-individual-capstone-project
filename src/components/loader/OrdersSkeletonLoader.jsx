import React from 'react';

const OrdersSkeletonLoader = () => {
  return (
    <div className="p-5 bg-gray-900 text-white">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="grid gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-4 py-5 bg-gray-800 rounded-md shadow-md">
              <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="mt-4">
                <div className="h-5 bg-gray-700 rounded w-1/4 mb-2"></div>
                <ul className="ml-4 list-disc">
                  {[...Array(3)].map((_, idx) => (
                    <li key={idx} className="h-4 bg-gray-700 rounded w-3/4 mb-2"></li>
                  ))}
                </ul>
              </div>
              <div className="h-4 bg-gray-700 rounded w-1/4 mt-4 mb-2"></div>
              <div className="mt-4">
                <div className="h-5 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              </div>
              <div className="mt-4">
                <div className="h-5 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="lg:flex lg:space-x-4 grid gap-2 mt-2">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="h-8 bg-gray-700 rounded w-full lg:w-1/5"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeletonLoader;
