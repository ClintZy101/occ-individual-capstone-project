import React from "react";
import useFetchOrders from "../../../api/useFetchOrders";


export default function OrderList() {
  const { orders, isLoading } = useFetchOrders();

  if (isLoading) return <p>Loading orders...</p>;

  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Customer Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="p-4 bg-gray-800 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">Order #{order._id}</h2>
            <p className="text-gray-400">Customer: {order.customer.username}</p>
            <p className="text-gray-400">Email: {order.customer.email}</p>
            <p className="text-gray-400">Date: {new Date(order.createdAt).toLocaleString()}</p>

            <div className="mt-4">
              <h3 className="font-bold text-lg">Products:</h3>
              <ul className="ml-4 list-disc">
                {order.products.map((item) => (
                  <li key={item.product._id} className="text-gray-300">
                    {item.product.title} - ${item.product.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-400 mt-4">
              Total Amount: <span className="font-bold">${order.totalAmount}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
