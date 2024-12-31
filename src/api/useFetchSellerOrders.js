import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { LOCALHOST } from "./endpoint";

export default function useFetchSellerOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuthStore();

  const fetchOrders = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${LOCALHOST}api/orders/seller/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data)
        setOrders(response.data);
      } else {
        console.log("No orders found.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, isLoading, fetchOrders, setIsLoading };
}
