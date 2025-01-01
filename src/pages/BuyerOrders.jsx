import React from "react";

import {
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaClipboardList,
  FaHourglassHalf,
  FaArrowDown,
} from "react-icons/fa";
import useFetchBuyerOrders from "../api/useFetchBuyerOrders";
import OrdersSkeletonLoader from "../components/loader/OrdersSkeletonLoader";

export default function BuyerOrders() {
  const { orders, isLoading } = useFetchBuyerOrders();

  if (isLoading) return <OrdersSkeletonLoader />;

  // Sort orders by date, latest on top
  const sortedOrders = orders?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const renderOrderStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Order Processing":
        return <FaClipboardList className="text-blue-500" />;
      case "Out For Delivery":
        return <FaTruck className="text-orange-500" />;
      case "Shipped":
        return <FaBoxOpen className="text-purple-500" />;
      case "Completed":
        return <FaCheckCircle className="text-green-500" />;
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

  return (
    <div className="p-5 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 && (
        <div className="grid">
          <p className="font-semibold text-xl">Orders</p>
          <p className="">No orders found.</p>
        </div>
      )}
      <div className="grid gap-6">
        {sortedOrders.map((order) => (
          <div
            key={order._id}
            className="p-4  py-5 bg-gray-800 rounded-md shadow-md"
          >
            <h2 className="text-xl font-semibold">Order #{order._id}</h2>
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
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Order Status:</h3>
              <div className="lg:flex lg:space-x-4 grid gap-2 mt-2">
                {statusOptions.map((status) => (
                  <div  key={status}>
                    <div
                      className={`flex items-center space-x-2 p-2 px-8 rounded ${
                        order.status === status
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {renderOrderStatusIcon(status)}
                      <span>{status}</span>
                    </div>
                    {/* <div className="md:hidden w-full text-center" >
                      <FaArrowDown className="mx-auto text-xl my-2" />
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
