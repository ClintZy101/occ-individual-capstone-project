import React, { useEffect, useState } from "react";

import ProductsGallerySidebar from "../components/sidebar/ProductsGallerySidebar";
import Gallery from "../components/gallery/Gallery";
import useCategory from "../utils/useCategory";
import usePriceRangeStore from "../store/usePriceRange";
import useAllProducts from "../store/useAllProducts";

export default function Shop() {
  const { allProducts } = useAllProducts();
  // console.log(allProducts);
  const {
    chosenCategory,
    setChosenCategory,
    productsByCategory,
    setProductsByCategory,
  } = useCategory(allProducts);
  const [filteredProductsByPriceRange, setFilteredProductsByPriceRange] =
    useState([]);

  const { minValue, maxValue, productsByPriceRange, setProductsByPriceRange } =
    usePriceRangeStore();

  useEffect(() => {
    // // Filter products based on price range
    let newProductArray = productsByCategory.filter(
      (product) => product.price >= minValue && product.price <= maxValue
    );
  
    setFilteredProductsByPriceRange(newProductArray);


  }, [
    minValue,
    maxValue,
    chosenCategory,
    productsByCategory,
    setProductsByPriceRange,
  ]);

  return (
    <div className=" md:flex bg-black -mt-12 p-5 pt-[70px]">
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
        {/* <p>
          This is your category description. <br /> It’s a great place to tell
          customers what this category is about.
        </p> */}
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
