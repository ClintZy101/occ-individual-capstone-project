import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import useFetchProducts from "../../../api/useFetchProducts";
import { LOCALHOST } from "../../../api/endpoint";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";

export default function DeleteProductModal({
  productName,
  productId,
  isOpen,
  onClose,
}) {
  const { setTrigger, fetchUserProducts } = useFetchProducts();
  const { token } = useAuthStore();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const proceedDelete = async () => {
    try {
      const response = await axios.delete(
        `${LOCALHOST}api/products/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Product Deleted successfully!");
        console.log("Deleted Product:", response.data.product);
        // setTrigger((prev) => prev + 1);

      } else {
        alert(response.data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }

    onClose(); // Close modal after saving
  };

  const handleDelete = () => {
    if (inputValue === productName) {
      proceedDelete();
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Delete Product</DialogHeader>
      <DialogBody>
        <p className="mb-2">
          Type the name of the product to confirm deletion:
          <strong>{productName}</strong>{" "}
        </p>

        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="red"
          onClick={handleDelete}
          disabled={inputValue !== productName}
        >
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
