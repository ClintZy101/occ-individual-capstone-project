import React, { useEffect, useState } from "react";
import useFetchOrders from "../../../api/useFetchSellerOrders";
import axios from "axios";
import { API_URL, LOCALHOST } from "../../../api/endpoint";
import OrdersSkeletonLoader from "../../loader/OrdersSkeletonLoader";
import { FaBoxOpen, FaCheckCircle, FaClipboardList, FaHourglassHalf, FaTruck } from "react-icons/fa";

export default function OrderList() {
  const { orders, isLoading, fetchSellerOrders, setIsLoading } = useFetchOrders();
 console.log(isLoading)

  // Sort orders by date, latest on top
   const sortedOrders = orders?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const renderOrderStatusIcon = (status) => {
      switch (status) {
        case "Pending":
          return <div className="flex space-x-2 items-center"><FaHourglassHalf className="text-yellow-500" /> <p className="text-yellow-500">{status}</p></div> ;
        case "Order Processing":
          return <div className="flex space-x-2 items-center"> <FaClipboardList className="text-blue-500" /> <p className="text-blue-500">{status}</p></div>;
        case "Out For Delivery":
          return <div className="flex space-x-2 items-center"> <FaTruck className="text-orange-500" /> <p className="text-orange-500">{status}</p></div>;  
        case "Shipped":
          return <div className="flex space-x-2 items-center"><FaBoxOpen className="text-purple-500" /> <p className="text-purple-500">{status}</p></div>;   
        case "Completed":
          return <div className="flex space-x-2 items-center"><FaCheckCircle className="text-green-500" /> <p className="text-green-500">{status}</p></div>;    
        default:
          return null;
      }
    };

  const statusOptions = [
    "Pending",
    "Order Processing",
    "Out For Delivery",
    "Shipped",
    "Completed",
  ];

  // change to skeleton loader
  if (isLoading) return <OrdersSkeletonLoader />;

  if (!orders.length)
    return (
      <div className="grid">
        <p className="font-semibold text-xl">Orders</p>
        <p className="">No orders found.</p>
      </div>
    );


  const handleStatusUpdate = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
      setIsLoading(true);

    try {
      const response = await axios.put(
        `${LOCALHOST}api/orders/seller/order-status`,
        {
          orderId,
          status: newStatus,
        }
      );
      console.log(
        `Order ${orderId} status updated to ${newStatus}`,
        response.data
      );
    } catch (error) {
      console.error(`Failed to update order ${orderId} status`, error);
    } finally {
      fetchSellerOrders();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const renderStatusButtons = (order) => {
    const currentStatusIndex = statusOptions.indexOf(order.status);

    if (
      currentStatusIndex === -1 ||
      currentStatusIndex === statusOptions.length - 1
    ) {
      return null;
    }

    const nextStatus = statusOptions[currentStatusIndex + 1];

    return (
      <button
        onClick={() => handleStatusUpdate(order._id, nextStatus)}
        className="font-semibold mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Set To:  {nextStatus}
      </button>
    );
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Customer Orders</h1>
      <div className="grid gap-6">
        {sortedOrders?.map((order) => (
          <div key={order._id} className="p-4 bg-gray-800 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-blue-200">Order #{order._id}</h2>
            <p className="text-gray-400">Customer: {order.buyer.username}</p>
            <p className="text-gray-400">Email: {order.buyer.email}</p>
            <p className="text-gray-400">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Products:</h3>
              <ul className="ml-4 list-disc">
                {order.cartItems.map((item) => (
                  <li key={item._id} className="text-gray-300">
                    {item.title} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-400 mt-4">
              Total Amount: <span className="font-bold">${order.total}</span>
            </p>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Shipping Address:</h3>
              <p className="text-gray-400">
                {order.shippingAddress.name}, {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">
                Order Status: {renderOrderStatusIcon(order.status)}
              </h3>
              <div className="flex space-x-2">{renderStatusButtons(order)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
