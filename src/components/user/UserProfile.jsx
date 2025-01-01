import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LOCALHOST } from "../../api/endpoint";
import { useAuthStore } from "../../store/useAuthStore";
import SalesActivity from "./SalesActivity";
import Chart from "react-apexcharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import UserProfileSkeletonLoader from "../loader/UserProfileSkeletonLoader";
import useUserProfile from "../../store/useUserProfileDetails";
import LinkBackButton from "../buttons/LinkBackButton";

const UserProfile = () => {
  const { user } = useUserProfile();
  const { token } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }  , 1000);
  //   }, [isLoading]);

  //   if (isLoading) return <UserProfileSkeletonLoader />;

  useEffect(() => {
    const fetchUserOrders = async () => {
      setIsLoading(true);
      try {
        if (user.role === "buyer") {
          const res = await axios.get(
            `${LOCALHOST}api/orders/buyer/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrders(res.data);
        } else if (user.role === "seller" || user.role === "admin") {
          const res = await axios.get(
            `${LOCALHOST}api/orders/seller/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrders(res.data);
        }
        // const ordersResponse = await axios.get(`${LOCALHOST}api/orders`,{
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // });
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const chartData = {
    series: [
      {
        name: "Sales",
        data: orders.map(order => order.total),
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: orders.map(order => new Date(order.createdAt).toLocaleDateString()),
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "12px",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      grid: {
        borderColor: "#e2e8f0",
        strokeDashArray: 5,
      },
      colors: ["#0284c7"],
    },
  };

  const calculatePercentageChange = (orders) => {
    if (orders.length < 2) return 0;
    const latestOrder = orders[orders.length - 1].total;
    const previousOrder = orders[orders.length - 2].total;
    return ((latestOrder - previousOrder) / previousOrder) * 100;
  };

  const percentageChange = calculatePercentageChange(orders);

  return (
    <div className="text-white min-h-screen p-5 bg-gray-900">
      <div className="w-full">
        <LinkBackButton
          text="Back To UserManagement"
          endpoint="/user-management"
        />
      </div>
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
            <h2 className="text-xl font-bold mb-2">Orders Data</h2>
            <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
            <p className="text-white mt-2 flex items-center">
              Percentage Change: {percentageChange.toFixed(2)}%
              {percentageChange >= 0 ? (
                <FaArrowUp className="text-green-500 ml-2" />
              ) : (
                <FaArrowDown className="text-red-500 ml-2" />
              )}
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">Products</h2>
            {products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id} className="text-gray-400">
                    {product.name} - {product.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No products found</p>
            )}
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">Orders</h2>
            {orders.length > 0 ? (
              <div>
                {orders.map((order) => (
                  <div key={order._id} className="border-b border-gray-700 pb-4">
                    <p  className="text-gray-400">
                      Order #{order.id} - ${order.total}
                    </p>
                    <p>
                        Date: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No orders found</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
