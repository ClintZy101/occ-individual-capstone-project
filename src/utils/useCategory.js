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
    const filterProducts = () => {
      switch (chosenCategory.link) {
        case "bestsellers":
          setProductsByCategory(
            allProducts.filter((product) =>
              product.category.includes("bestsellers")
            )
          );
          break;

        case "accessories":
          setProductsByCategory(
            allProducts.filter((product) =>
              product.category.includes("accessories")
            )
          );
          break;

        case "speakers&headphones":
          setProductsByCategory(
            allProducts.filter(
              (product) =>
                product.category.includes("speakers") ||
                product.category.includes("headphones")
            )
          );
          break;

        case "homeappliances":
          setProductsByCategory(
            allProducts.filter((product) =>
              product.category.includes("homeappliances")
            )
          );
          break;

        case "smartphones&watches":
          setProductsByCategory(
            allProducts.filter(
              (product) =>
                product.category.includes("smartphones") ||
                product.category.includes("watches")
            )
          );
          break;

        case "sale":
          setProductsByCategory(
            allProducts.filter((product) => product.category.includes("sale"))
          );
          break;

        case "products":
        default:
          setProductsByCategory(allProducts);
          break;
      }
    };

    filterProducts();
    // setProductsByCategory(filteredProducts);
    // console.log("filteredProducts", filteredProducts);
    console.log("chosenCategory", chosenCategory.link);
    console.log(productsByCategory);
  }, [chosenCategory, allProducts]);

  return {
    chosenCategory,
    setChosenCategory,
    productsByCategory,
    setProductsByCategory,
  };
}
