import React, { useEffect } from "react";
import useSeller from "../store/useSeller";
import useFetchProducts from "../api/useFetchProducts";
import Gallery from "../components/gallery/Gallery";

export default function SellerStore() {
  const { seller } = useSeller();
  const userIdToFilter = seller?._id;
  const { allProducts, fetchAllProducts } = useFetchProducts();

 useEffect(() => {
    fetchAllProducts();
  }, []);

  const sellerProducts = allProducts.filter(
    (product) => product.user?._id === userIdToFilter
  );
  // console.log(allProducts)
  console.log(sellerProducts, seller._id)

  if (!seller) {
    return <div className="text-white p-5 min-h-screen">SellerStore</div>;
  }

  return (
    <div className="text-white p-5 min-h-screen">
      <div className=" items-center px-10">
        <h1 className="font-semibold text-xl w-full text-center"> Store Products </h1>
        <p className="text-lg">
          Seller Name: {""}
          <strong>{seller?.username}</strong>
        </p>
      </div>
      <div>
        <Gallery products={sellerProducts} />
      </div>
    </div>
  );
}
