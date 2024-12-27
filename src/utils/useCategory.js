import React, { useEffect, useState } from "react";
import useAllProducts from "../store/useAllProducts";

export default function useCategory() {
const { allProducts } = useAllProducts();

  const [chosenCategory, setChosenCategory] = useState({
    cat: "All Products",
    link: "products",
  });
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    switch (chosenCategory.link) {
      default:
        setProductsByCategory(allProducts);
        console.log('allProducts:', allProducts);
      case "products":
        setProductsByCategory(allProducts);
        break;
      case "bestsellers":
        let bestSellers = allProducts.filter((product) =>
          product.category.includes("bestsellers")
        );
        setProductsByCategory(bestSellers);
        break;
      case "accessories":
        let accessoryProducts = allProducts.filter((product) =>
          product.category.includes("accessories")
        );
        setProductsByCategory(accessoryProducts);
        break;
      case "speakers&headphones":
        let speakerAndHeadPhones = allProducts.filter((product) =>
          product.category.includes("speakers" || "headphones")
        );
        setProductsByCategory(speakerAndHeadPhones);
        break;
      case "homeappliances":
        let homeAppliances = allProducts.filter((product) =>
          product.category.includes("homeappliances")
        );
        setProductsByCategory(homeAppliances);
        break;
      case "smartphones&watches":
        let smartPhonesAndWatches = allProducts.filter((product) =>
          product.category.includes("smartphones" || "watches")
        );
        setProductsByCategory(smartPhonesAndWatches);
        break;
      case "sale":
        let onSale = allProducts.filter((product) =>
          product.category.includes("sale")
        );
        setProductsByCategory(onSale);
        break;
    }
  }, [chosenCategory]);

  return {
    chosenCategory,
    setChosenCategory,
    productsByCategory,
    setProductsByCategory,
  };
}
