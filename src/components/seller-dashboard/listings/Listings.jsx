import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { products } from "../../../data/allproducts";
import AddProductModal from "./AddProductModal";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { LOCALHOST } from "../../../api/endpoint";
import { useAuthStore } from "../../../store/useAuthStore";

export default function Listings() {
  const [openInfo, setOpenInfo] = useState(null);
  const [item, setItem] = useState({});
  const [openAddModal, setOpenAddModal] = useState(false);
  const { token } = useAuthStore();
  const handleOpenAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      // Make a POST request to your backend API
      const response = await axios.post(
        `${LOCALHOST}api/products/add`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Product added successfully!");
        console.log("Added Product:", response.data.product);
      } else {
        alert(response.data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if(!token){
        return alert('Please Login to see your product listing.')
      }
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
          console.log("User Products:", response.data.products);
        } else {
          console.log("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchUserProducts();

    const fetchAllProducts = async () => {
      const response = await axios.get(`${LOCALHOST}api/products/`);
      console.log("all products with users",response.data);
    };
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <p className="font-semibold my-2 text-xl">Listings</p>
        <Button
          onClick={handleOpenAddModal}
          variant="gradient"
          className="flex items-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Add Product
        </Button>
      </div>

      <AddProductModal
        openAddModal={openAddModal}
        handleOpenAddModal={handleOpenAddModal}
        handleAddProduct={handleAddProduct}
      />
      <div>
        {products.map((item, i) => (
          <div>
            <SingleProduct item={item} key={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
