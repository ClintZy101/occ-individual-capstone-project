import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LOCALHOST } from "../../api/endpoint";
import { useAuthStore } from "../../store/useAuthStore";
import SalesActivity from "./SalesActivity";
import UserProfileSkeletonLoader from "../loader/UserProfileSkeletonLoader";
import useUserProfile from "../../store/useUserProfileDetails";

const UserProfile = () => {
  const { user } = useUserProfile();
  //   if (loading) return <UserProfileSkeletonLoader />;

  return (
    <div className="text-white min-h-screen p-5 bg-gray-900">
      {user ? (
        <>
          <div className="w-full h-20 bg-black flex items-center justify-center mb-5">
            <h1 className="text-2xl font-bold">{user.username}'s Profile</h1>
          </div>
          <div className="bg-gray-800 p-5 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">User Details</h2>
            <p className="text-gray-400">Email: {user.email}</p>
            <p className="text-gray-400">Role: {user.role}</p>
            <p className="text-gray-400">
              Created At: {new Date(user.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-400">
              Updated At: {new Date(user.updatedAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">Sales Activity</h2>
            {/* <SalesActivity salesActivity={salesActivity} /> */}
          </div>
        </>
      ) : (
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
