import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import { LOCALHOST } from "./endpoint";
import useAllProducts from "../store/useAllProducts";

export default function useFetchProducts() {
  const {setAllProducts} = useAllProducts();
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthStore();
  const [trigger, setTrigger] = useState(0); // A trigger to refetch

  const fetchAllProducts = async () => {
    setIsLoading(true); // Start loading

    try {
      const response = await axios.get(`${LOCALHOST}api/products`);

      if (response.status === 200) {
        console.log("All products fetched successfully", response.data);
        setAllProducts(response.data);
      } else {
        console.log("No products found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Ensure loading state is always reset
      }, 1000);
    }
  }

  const fetchUserProducts = async () => {
    if (!token) {
      alert("Please Login to see your product listing.");
      return;
    }

      setIsLoading(true); // Start loading

    try {
      const response = await axios.get(
        `${LOCALHOST}api/products/user-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );

      if (response.status === 200) {
        setUserProducts(response.data.products);
      } else {
        console.log("No products found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Ensure loading state is always reset
      }, 1000);
     
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProducts();
    }
  }, [token, trigger]);

  return {
    userProducts,
    setUserProducts,
    isLoading,
    fetchUserProducts,
    fetchAllProducts,
    setTrigger,
  };
}
