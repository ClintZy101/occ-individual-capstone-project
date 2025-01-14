import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./endpoint";
import { useAuthStore } from "../store/useAuthStore";

export default function useFetchBuyerOrders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] =useState(false);
  const [ordersBeingProcessed, setProcessingOrders] = useState([])
  const [completedOrders, setCompletedOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/orders/buyer/${user._id}`
      );
      // console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  useEffect(()=>{
    let filteredProcessingOrders = orders?.filter(order => order.status === 'Order Processing');
    let filteredCompletedOrders = orders?.filter(order => order.status === 'Completed');
    
    if(filteredProcessingOrders.length > 0 || filteredCompletedOrders.length > 0 ){
      setNotification(true);
    }

    setProcessingOrders(filteredProcessingOrders);
    setCompletedOrders(filteredCompletedOrders);
    console.log(notification);
    console.log(ordersBeingProcessed);
    console.log(completedOrders);
  },[orders])

  return { orders, isLoading, fetchOrders, setIsLoading, notification, ordersBeingProcessed};
}
