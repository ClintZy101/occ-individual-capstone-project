import React, { useEffect, useState } from "react";
import ProductsGallerySidebar from "../components/sidebar/ProductsGallerySidebar";
import Gallery from "../components/gallery/Gallery";
import useCategory from "../utils/useCategory";
import usePriceRangeStore from "../store/usePriceRange";
import SearchFilter from "../components/SearchFilter";
import useFetchProducts from "../api/useFetchProducts";
import GalleryLoader from "../components/loader/GalleryLoader";

export default function Shop() {
  const { fetchAllProducts, isLoading, setIsLoading, allProducts } =
    useFetchProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [chosenCategory, setChosenCategory] = useState({
    cat: "All Products",
    link: "products",
  });

  const [productsByCategory, setProductsByCategory] = useState([{}]);
  // const { chosenCategory, setChosenCategory, productsByCategory } =
  //   useCategory();
  console.log(chosenCategory, productsByCategory);
  const { minValue, maxValue } = usePriceRangeStore();

  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const filteredProductsByCategory = () => {
      switch (chosenCategory.link) {
        case "bestsellers":
          return allProducts.filter((product) =>
            product.category.includes("bestsellers")
          );

        case "accessories":
          return allProducts.filter((product) =>
            product.category.includes("accessories")
          );

        case "speakers&headphones":
          return allProducts.filter(
            (product) =>
              product.category.includes("speakers") ||
              product.category.includes("headphones")
          );

        case "homeappliances":
          return allProducts.filter((product) =>
            product.category.includes("homeappliances")
          );

        case "smartphones&watches":
          return allProducts.filter(
            (product) =>
              product.category.includes("smartphones") ||
              product.category.includes("watches")
          );

        case "drones":
          return allProducts.filter((product) =>
            product.category.includes("drones")
          );

        case "sale":
          return allProducts.filter((product) =>
            product.category.includes("sale")
          );

        case "products":
        default:
          return allProducts;
      }
    };
    const timeoutId = setTimeout(() => {
      const searchableFields = ["title", "prod_info", "category", "user"];
      const matchesCategory = filteredProductsByCategory();

      const newFilteredProducts = matchesCategory.filter((product) => {
        const matchesPriceRange =
          product.price >= minValue && product.price <= maxValue;
        const matchesSearchTerm = searchableFields.some(
          (field) =>
            typeof product[field] === "string" &&
            product[field].toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesSearchTerm && matchesPriceRange;
      });

      setFilteredProducts(newFilteredProducts);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [allProducts, chosenCategory, minValue, maxValue, searchTerm]);

  return (
    <div className="md:flex bg-black -mt-12 p-5 pt-[70px] ">
      {/* Sidebar */}
      <div>
        <ProductsGallerySidebar
          chosenCategory={chosenCategory}
          setChosenCategory={setChosenCategory}
        />
      </div>

      {/* Product Gallery */}
      <div className="text-white md:mt-0  w-screen px-5">
        <h1 className="font-bold text-2xl mb-5">
          {chosenCategory?.cat || "All Products"}
        </h1>

        {/* Search Bar */}
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Conditional Rendering for No Products */}
        {isLoading ? (
          <GalleryLoader />
        ) : filteredProducts.length === 0 ? (
          <div className="mt-[100px] text-white text-2xl mx-auto border-gray-100 border p-10 rounded-lg w-5/6 ">
            No Items Found!
            <br /> <br /> Adjust your filters to view products.
          </div>
        ) : (
          <Gallery products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
