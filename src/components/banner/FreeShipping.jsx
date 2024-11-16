import React from "react";

export default function FreeShipping({ hideElement }) {
  return (
    <div
      className={` ${
        hideElement === true ? "hidden" : "flex"
      }'bg-black w-full h-10 text-center text-white  items-center justify-center'`}
    >
      FREE 2-DAY SHIPPING FOR ORDERS OF $1000 OR MORE
    </div>
  );
}
