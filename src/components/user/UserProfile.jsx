import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../api/endpoint";
import { useAuthStore } from "../../store/useAuthStore";
import Chart from "react-apexcharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useUserProfile from "../../store/useUserProfileDetails";
import LinkBackButton from "../buttons/LinkBackButton";
import useFetchProducts from "../../api/useFetchProducts";
import Gallery from "../gallery/Gallery";

const UserProfile = () => {
  const { user } = useUserProfile();
  const { allProducts, fetchAllProducts } = useFetchProducts();
  const { token } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(userId, user)

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        if (user.role === "buyer") {
          const res = await axios.get(
            `${API_URL}/api/orders/buyer/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrders(res.data);
        } else if (user.role === "seller" || user.role === "admin") {
          const ordersRes = await axios.get(
            `${API_URL}/api/orders/seller/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrders(ordersRes.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchAllProducts();
    
    const filteredProducts = allProducts?.filter(
      (product) => product.user?._id === userId
    );

    setProducts(filteredProducts);

    fetchUserDetails();
  }, [userId, allProducts]);

  // console.log(products);

  const chartData = {
    series: [
      {
        name: "Sales",
        data: orders.map((order) => order.total),
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
        categories: orders.map((order) =>
          new Date(order.createdAt).toLocaleDateString()
        ),
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

  const renderRole = (role) => {
    switch (role) {
      case "admin":
        return "text-orange-500";
      case "seller":
        return "text-yellow-500";
      case "buyer":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const [bestProduct, setBestProduct] = useState("");

  useEffect(() => {
    const calculateBestProduct = () => {
      const productQuantities = {};

      orders?.forEach((order) => {
        order.cartItems.forEach((item) => {
          if (!productQuantities[item.title]) {
            productQuantities[item.title] = 0;
          }
          productQuantities[item.title] += item.quantity;
        });
      });

      const bestProduct = Object.keys(productQuantities).reduce(
        (a, b) => (productQuantities[a] > productQuantities[b] ? a : b),
        ""
      );

      return bestProduct;
    };

    const bestProduct = calculateBestProduct();
    setBestProduct(bestProduct);
  }, [orders]);

  return (
    <div className="text-white min-h-screen p-5 bg-gray-900 pb-[200px]">
      <LinkBackButton
        text="Back To UserManagement"
        endpoint="/user-management"
      />

      <div className="flex space-x-4 my-4">
        <a
          href="#order-data"
          className="text-gray-500 hover:underline"
          style={{ scrollBehavior: "smooth" }}
        >
          Order Data
        </a>
        <a
          href="#orders"
          className="text-gray-500 hover:underline"
          style={{ scrollBehavior: "smooth" }}
        >
          Orders
        </a>
        {(user.role === "seller" || user.role === "admin") && (
          <a
            href="#products"
            className="text-gray-500 hover:underline"
            style={{ scrollBehavior: "smooth" }}
          >
            Products
          </a>
        )}
      </div>
      {user ? (
        <>
          <div className="w-full h-20 bg-black flex items-center justify-center mb-5">
            <h1 className="text-2xl font-bold">{user.username}'s Profile</h1>
          </div>
          <div className="bg-gray-800 p-5 rounded-md shadow-md md:flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-300">
                User Details
              </h2>

              <p className="text-gray-400 font-semibold italic">
                Email: {user.email}
              </p>
              <p className="text-gray-400 font-semibold">
                Username: {user.username}
              </p>
            </div>

            <p className={`${renderRole(user.role)} font-semibold`}>
              Role: {user.role}
            </p>
            <div>
              <p className="text-gray-400">
                Created At: {new Date(user.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-400">
                Updated At: {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div id="order-data" className="mt-10">
            <h2 className="text-xl font-bold mb-2">Orders Data</h2>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />
          </div>

          <div className="md:flex justify-around mt-10 grid gap-5 bg-gray-800 p-5   rounded-md shadow-xl">
            <p className="text-white  flex items-center text-xl font-bold   rounded p-5 bg-gray-900">
              Percentage Change: {percentageChange.toFixed(2)}%
              {percentageChange >= 0 ? (
                <FaArrowUp className="text-green-500 ml-2" />
              ) : (
                <FaArrowDown className="text-red-500 ml-2" />
              )}
            </p>
            <div className="bg-gray-900 rounded-md p-5">
              <p className="text-xl font-bold">{user.role == 'seller' && 'Best Performing Product:'}{user.role == 'buyer' && 'Favorite Product:'}</p>
              <p className="text-xl">{bestProduct}</p>
            </div>
          </div>

          <div id="orders" className="mt-10">
            <h2 className="text-xl font-bold mb-2">Orders</h2>
            {orders.length > 0 ? (
              <div>
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border-b border-gray-700 py-4 "
                  >
                    <p className=" text-blue-300">Order #{order._id}</p>

                    <div className="mt-2">
                      <h3 className="text-lg font-semibold">Products:</h3>
                      <ul>
                        {order.cartItems.map((product) => (
                          <li key={product._id} className="text-gray-400">
                            {product.title} - ${product.price} x{" "}
                            {product.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className=" text-white my-2 font-semibold">
                      ${order.total}
                    </p>
                    <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No orders found</p>
            )}
          </div>

          {(user.role === "seller" || user.role === "admin") && (
            <div id="products" className="mt-10">
              <h2 className="text-xl font-bold mb-2">Products</h2>
              {products.length > 0 ? (
                <Gallery products={products} />
              ) : (
                <p className="text-gray-400">No products found</p>
              )}
            </div>
          )}

          {(user.role === "seller" || user.role === "admin") && (
            <div id="best-product" className="mt-10">
              <h2 className="text-xl font-bold mb-2">
                Best Performing Product
              </h2>
              <div className="bg-gray-800 p-5 rounded-lg shadow-md">
                <h3 className="text-sm text-white">Best Product by Orders</h3>
                <p className="text-2xl font-bold text-white">{bestProduct}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
