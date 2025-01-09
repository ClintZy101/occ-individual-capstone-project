import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchBuyerOrders from "../../api/useFetchBuyerOrders";
import { useAuthStore } from "../../store/useAuthStore";

export default function BuyerNotificationTable() {
    const {user} = useAuthStore();
    const {
        isLoading,
        ordersBeingProcessed: orders,
        notification,
      } = useFetchBuyerOrders();

  // const markAsRead = (id) => {
  //   setNotifications((prev) =>
  //     prev.map((notification) =>
  //       notification.id === id
  //         ? { ...notification, status: "Read" }
  //         : notification
  //     )
  //   );
  // };

  const renderLoaderText = (role) => {
    switch (role) {
      case "buyer":
        return "No Buyer Notification for now";
      case "seller":
        return "No Seller Notification for now";
      case "admin":
        return "No Seller Notification for now";
      default:
        return "No Notification for now";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen p-5">
        <p className="font-bold text-white text-2xl mt-10 text-center w-full">
          {renderLoaderText(user?.role) + '...'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black ">
      <div className="max-w-6xl mx-auto bg-black text-white shadow-lg rounded-lg">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-200">Buyer Notifications</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-6 py-3 text-gray-200 font-medium">#</th>
                <th className="px-6 py-3 text-gray-200 font-medium">Title</th>
                <th className="px-6 py-3 text-gray-200 font-medium">
                  Message
                </th>
                <th className="px-6 py-3 text-gray-200 font-medium">Date</th>
                <th className="px-6 py-3 text-gray-200 font-medium">Status</th>
                <th className="px-6 py-3 text-gray-200 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">Order is Being Processed</td>
                  <td className="px-6 py-4">
                    
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        order.status === "Unread"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
