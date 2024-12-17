import React, { useEffect, useState } from "react";

import ProductsGallerySidebar from "../components/sidebar/ProductsGallerySidebar";
import Gallery from "../components/gallery/Gallery";
import useCategory from "../utils/useCategory";
import usePriceRangeStore from "../store/usePriceRange";


export default function Shop() {
  const {
    chosenCategory,
    setChosenCategory,
    productsByCategory,
    setProductsByCategory,
  } = useCategory();
  const [filteredProductsByPriceRange, setFilteredProductsByPriceRange] =
  useState([]);


  const { minValue, maxValue, priceRangeActive, setProductsByPriceRange } =
    usePriceRangeStore();
  

  useEffect(() => {
    // Filter products based on price range
    let newProductArray = productsByCategory.filter(
      (product) => product.price >= minValue && product.price <= maxValue
    );

    // Update filtered products in Zustand store
    // setProductsByPriceRange(filteredProducts);
    setFilteredProductsByPriceRange(newProductArray);
  }, [
    minValue,
    maxValue,
    chosenCategory,
    productsByCategory,
    setProductsByPriceRange,
  ]);

  return (
    <div className="-mt-12  md:flex bg-black -mt-10 p-5 pt-[70px]">
      {/* Sidebar */}
      <div className="">
        <ProductsGallerySidebar
          chosenCategory={chosenCategory}
          setChosenCategory={setChosenCategory}
        />
      </div>
     

      {/* Product Gallery */}
      <div className="text-white md:mt-0  grid ">
        <h1 className="font-bold text-2xl mb-5">
          {chosenCategory?.cat || "All Products"}
        </h1>
        <p>
          This is your category description. <br /> It’s a great place to tell
          customers what this category is about.
        </p>
        {filteredProductsByPriceRange.length === 0 && (
          <div className="mt-[100px] text-white text-2xl mx-auto border-gray-100 border p-10 rounded-lg">
            No Items in Price Range!
            <br /> <br /> Adjust the Price Filter again to view products.
          </div>
        )}
        {filteredProductsByPriceRange ? (
          <Gallery products={filteredProductsByPriceRange} />
        ) : (
          <Gallery products={productsByCategory} />
        )}
      </div>
    </div>
  );
}
