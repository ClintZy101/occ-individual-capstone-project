import React, { useEffect, useState } from "react";

import ProductsGallerySidebar from "../components/sidebar/ProductsGallerySidebar";
import Gallery from "../components/gallery/Gallery";
import useCategory from "../utils/useCategory";
import usePriceRangeStore from "../store/usePriceRange";
import useAllProducts from "../store/useAllProducts";
import SearchFilter from "../components/SearchFilter";
import AlgoliaSearch from "../components/AlgoliaSearch";
import useFetchProducts from "../api/useFetchProducts";
import GallerySkeletonLoader from "../components/loader/GalleryProductSkeleton";
import { ImagePlacehoderSkeleton } from "../components/loader/ImageSkeleton";
import SingleProductSkeleton from "../components/loader/SingleProductListingSkeleton";
import GalleryProductSkeleton from "../components/loader/GalleryProductSkeleton";
import GalleryLoader from "../components/loader/GalleryLoader";

export default function Shop() {
  const { fetchAllProducts, isLoading, setIsLoading, allProducts } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState("");


  const {
    chosenCategory,
    setChosenCategory,
    productsByCategory,
    setProductsByCategory,
  } = useCategory();

  const { minValue, maxValue } = usePriceRangeStore();

  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    fetchAllProducts();
  } ,[]);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      // Define searchable fields
      setProductsByCategory(allProducts);

      const searchableFields = ["title", "prod_info", "category", "user"];

      const newFilteredProducts = allProducts.filter((product) => {
        const matchesCategory = productsByCategory;
        const matchesPriceRange =
          product.price >= minValue && product.price <= maxValue;
        const matchesSearchTerm = searchableFields.some(
          (field) =>
            typeof product[field] === "string" &&
            product[field].toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesSearchTerm && matchesPriceRange && matchesCategory;
      });

      setFilteredProducts(newFilteredProducts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [allProducts, chosenCategory, minValue, maxValue, searchTerm]);

  return (
    <div className="md:flex bg-black -mt-12 p-5 pt-[70px]">
      {/* Sidebar */}
      <div>
        <ProductsGallerySidebar
          chosenCategory={chosenCategory}
          setChosenCategory={setChosenCategory}
        />
      </div>

      {/* Product Gallery */}
      <div className="text-white md:mt-0 grid">
        <h1 className="font-bold text-2xl mb-5">
          {chosenCategory?.cat || "All Products"}
        </h1>

        {/* Algolia Search */}
        {/* <AlgoliaSearch /> */}

        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Conditional Rendering for No Products */}
        {isLoading ? (
          <GalleryLoader />
        ) : filteredProducts.length === 0 ? (
          <div className="mt-[100px] text-white text-2xl mx-auto border-gray-100 border p-10 rounded-lg">
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
