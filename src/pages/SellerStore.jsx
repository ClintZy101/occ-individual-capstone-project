import React, { useEffect } from "react";
import useSeller from "../store/useSeller";
import useFetchProducts from "../api/useFetchProducts";
import Gallery from "../components/gallery/Gallery";

export default function SellerStore() {
  const { seller, setSeller } = useSeller();
  const userIdToFilter = seller?._id;
  const { fetchAllProducts, allProducts } = useFetchProducts();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const sellerProducts = allProducts.filter(
    (product) => product.user._id === userIdToFilter
  );

  if (!seller) {
    return <div className="text-white p-5 min-h-screen">SellerStore</div>;
  }

  return (
    <div className="text-white p-5 min-h-screen">
      <div className="flex items-center space-x-5 px-10">
        <h1 className="font-semibold text-xl">Seller Store: </h1>
        <p className="text-lg">
          <strong>{seller?.username}</strong>
        </p>
      </div>
      <div>
        <Gallery products={sellerProducts} />
      </div>
    </div>
  );
}
