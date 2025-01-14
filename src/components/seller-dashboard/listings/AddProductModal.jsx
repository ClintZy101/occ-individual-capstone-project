import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export default function AddProductModal({ openAddModal, handleOpenAddModal, handleAddProduct }) {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    on_sale: false,
    category: "",
    overview: "",
    prod_info: "",
    src: "",
  });
  const [dragging, setDragging] = useState(false);
  const [uploadType, setUploadType] = useState("drag"); // 'drag' or 'url'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, src: reader.result });
        setUploadType("drag"); // Switch to drag mode
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop a valid image file.");
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, src: reader.result });
        setUploadType("drag"); // Switch to drag mode
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleURLInput = (e) => {
    setFormData({ ...formData, src: e.target.value });
    setUploadType("url"); // Switch to URL mode
  };

  const handleAdd = () => {
    if (!formData.title || !formData.price || !formData.src) {
      alert("Please fill in all required fields!");
      return;
    }
    handleAddProduct(formData); // Pass data to parent
    handleOpenAddModal(); // Close modal
    setFormData({
      title: "",
      price: 0,
      stock: 0,
      on_sale: false,
      category: "",
      overview: "",
      prod_info: "",
      src: "",
    });
  };

  return (
    <Dialog
      open={openAddModal}
      handler={handleOpenAddModal}
      className="bg-gray-800 text-white border-4 border-gray-500 px-4"
    >
      <DialogHeader className="text-white">Add New Product</DialogHeader>
      <DialogBody className="overflow-y-auto max-h-[75vh]">
        <form className="grid gap-4">
          {/* Title */}
          <div>
            <label className="block text-gray-400">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black rounded-md"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-400">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black rounded-md"
              required
            />
          </div>
          {/* Stock Available*/}
          <div>
            <label className="block text-gray-400">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black rounded-md"
              required
            />
          </div>

          {/* On Sale */}
          {/* <div className="flex items-center gap-2">
            <label className="block text-gray-400">On Sale</label>
            <input
              type="checkbox"
              name="on_sale"
              checked={formData.on_sale}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-400 focus:ring-purple-500"
            />
          </div> */}

          {/* Image Section */}

            <div>
              <label className="block text-gray-400">Image URL</label>
              <input
                type="text"
                name="src"
                value={formData.src}
                onChange={handleURLInput}
                className="w-full px-3 py-2 text-black rounded-md"
                required
              />
              {/* <button
                type="button"
                onClick={() => setUploadType("drag")}
                className="mt-2 text-sm text-gray-400 underline"
              >
                Upload Image instead
              </button> */}
            </div>

          {formData.src && (
            <img
              src={formData.src}
              alt="Uploaded Preview"
              className="mt-4 rounded-md max-w-full h-auto"
            />
          )}

          {/* Category */}
          <div>
            <label className="block text-gray-400">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Separate categories with commas"
              className="w-full px-3 py-2 text-black rounded-md"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block text-gray-400">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 text-black rounded-md"
            />
          </div>

          {/* Product Information */}
          <div>
            <label className="block text-gray-400">Product Information</label>
            <textarea
              name="prod_info"
              value={formData.prod_info}
              onChange={handleChange}
              rows="5"
              className="w-full px-3 py-2 text-black rounded-md"
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter className="space-x-5">
        <Button onClick={handleOpenAddModal} color="red" className="hover:bg-red-700">
          Cancel
        </Button>
        <Button type="submit" onClick={handleAdd} color="blue-gray" className="hover:bg-blue-gray-700">
          Add Product
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
