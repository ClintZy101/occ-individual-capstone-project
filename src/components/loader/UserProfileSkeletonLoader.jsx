import React from 'react';

const UserProfileSkeletonLoader = () => {
  return (
    <div className="p-5 bg-gray-900 text-white animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-5"></div>
      <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
      <div className="h-8 bg-gray-700 rounded w-1/4 mt-10 mb-5"></div>
      <div className="grid gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-md shadow-md">
            <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileSkeletonLoader;
