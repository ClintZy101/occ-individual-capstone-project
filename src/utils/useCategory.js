import React, { useEffect, useState } from "react";
import { products } from "../data/allproducts";

export default function useCategory(){
    const [chosenCategory, setChosenCategory] = useState({
        cat: "All Products",
        link: "products",
      });
      const [productsByCategory, setProductsByCategory] = useState([]);
    useEffect(() => {
        switch (chosenCategory.link) {
          default:
            setProductsByCategory(products);
          case "products":
            setProductsByCategory(products);
            break;
          case "bestsellers":
            let bestSellers = products.filter((product) =>
              product.category.includes("bestsellers")
            );
            console.log(bestSellers);
            setProductsByCategory(bestSellers);
            break;
          case "accessories":
            let accessoryProducts = products.filter((product) =>
              product.category.includes("accessories")
            );
            setProductsByCategory(accessoryProducts);
            break;
          case "speakers&headphones":
            let speakerAndHeadPhones = products.filter((product) =>
              product.category.includes("speakers" || "headphones")
            );
            setProductsByCategory(speakerAndHeadPhones);
            break;
          case "homeappliances":
            let homeAppliances = products.filter((product) =>
              product.category.includes("homeappliances")
            );
            setProductsByCategory(homeAppliances);
            break;
          case "smartphones&watches":
            let smartPhonesAndWatches = products.filter((product) =>
              product.category.includes("smartphones" || "watches")
            );
            setProductsByCategory(smartPhonesAndWatches);
            break;
          case "sale":
            let onSale = products.filter((product) =>
              product.category.includes("sale")
            );
            setProductsByCategory(onSale);
            break;
        }
      }, [chosenCategory]);

      return {chosenCategory, setChosenCategory, productsByCategory, setProductsByCategory}
}
