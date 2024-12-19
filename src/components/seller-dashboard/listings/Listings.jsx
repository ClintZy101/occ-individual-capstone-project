import React, { useState } from "react";
import SingleProduct from "./SingleProduct";
import { products } from "../../../data/allproducts";


export default function Listings() {
  const [openInfo, setOpenInfo] = useState(false);
  const [item, setItem] = useState({})
  return (
    <div>
      <p className="font-semibold my-2 text-xl">Listings</p>

      <div>
        {products.map((item, i) => (
          <div>
            <SingleProduct item={item} key={item.id} setOpenInfo={setOpenInfo}/>
          </div>
        ))}
      </div>
    </div>
  );
}
