import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { API_URL } from "./endpoint";


export default function useFetchSellerOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuthStore();
  const [notification, setNotification] =useState(false);
  const [pendingOrders, setPendingOrders] = useState([])


  const fetchSellerOrders = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${API_URL}/api/orders/seller/${user._id}`, {
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
    fetchSellerOrders();
  }, []);
  
  useEffect(()=>{
    let filteredOrders = orders?.filter(order => order.status === 'Pending')
    let activeNotification =  filteredOrders.length > 0 || false
    setNotification(activeNotification)
    setPendingOrders(filteredOrders)
  },[orders])

  return { orders, isLoading, fetchSellerOrders, setIsLoading, pendingOrders, notification };
}
