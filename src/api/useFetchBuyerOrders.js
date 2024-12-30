import { useState, useEffect } from "react";
import axios from "axios";
import { LOCALHOST } from "./endpoint";
import { useAuthStore } from "../store/useAuthStore";

export default function useFetchBuyerOrders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${LOCALHOST}api/orders/buyer/${user._id}`);
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return { orders, isLoading, fetchOrders, setIsLoading };
}
