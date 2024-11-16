import React from "react";

export default function Hero() {
  return (
    <div
      className={`bg-[url('https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-contain  w-screen h-[900px] bg-no-repeat `}
    >
      {/* hero 1 */}
      <div className="  w-screen h-[400px]">
        <div className="bg-white text-black  w-full h-[100px] grid place-items-center bg-opacity-80 p-5 md:mt-[400px] mt-[100px] ">
          <p className="md:text-2xl">
            Discover top-quality gadgets designed to elevate your lifestyle.
          </p>
        </div>
        <div className="h-[300px] bg-white"></div>
      </div>
    </div>
  );
}
