import React from "react";
import useProduct from "../../store/useProduct";
import { Link } from "react-router-dom";

export default function Trending({ products, category = "trending" }) {
  const{product, setProduct} =useProduct()
  return (
    <div className="bg-black p-5 pb-20">
         <h1 className="uppercase text-white text-lg my-5 ml-5">Trending Now</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center w-full relative">
        {products.map((product, index) => (
          <div
            key={product.id}
            className=" overflow-hidden grid relative"
          >
            <div className="max-h-[270px] overflow-hidden rounded">
              <Link to={`/shop/product/${product.title}`}>
              <img
              onClick={()=>setProduct(product)}
                src={product.src}
                alt={product.title}
                className="w-full h-full rounded hover:scale-125 duration-300 cursor-pointer min-h-[300px] aspect-square"
              />
              </Link>
            </div>
            <div className="my-4">
              <p className="text-white line-clamp-1">{product.title}</p>
              <p className="text-white">${product.price.toFixed(2)}</p>
            </div>
            <span
              className={`${
                product.on_sale ? "block" : "hidden"
              } ml-5 text-black border-black border px-2 rounded absolute top-2`}
            >
              Sale
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
