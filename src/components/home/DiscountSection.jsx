import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function DiscountSection() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // const image2 =
  //   "https://static.wixstatic.com/media/c837a6_e02af6e477d242db86b7de9c10c24553~mv2.jpg/v1/fill/w_2484,h_1164,fp_0.63_0.29,q_90,usm_0.66_1.00_0.01,enc_auto/Smartwatch-02-Header.jpg";
  // const image1 =
  //   "https://images.pexels.com/photos/8032728/pexels-photo-8032728.jpeg";
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-[url('https://static.wixstatic.com/media/c837a6_e02af6e477d242db86b7de9c10c24553~mv2.jpg/v1/fill/w_2484,h_1164,fp_0.63_0.29,q_90,usm_0.66_1.00_0.01,enc_auto/Smartwatch-02-Header.jpg')] w-screen h-[500px] rounded-t-3xl bg-cover grid place-items-center bg-center relative `}
    >
      <p className="absolute bottom-0 py-5 text-xl  bg-black text-white w-full px-5 bg-opacity-40 font-thin ">
        10% off all smart watches with every purchase <br /> Explore limited
        time offers
      </p>
      <div
        className={`w-full h-full text-white transition duration-500 bg-black bg-opacity-45 ${
          isHovered ? "grid place-items-center" : "hidden"
        }`}
      >
        <Link to={"/shop"}>
          <button className="flex items-center space-x-2 group">
            <p className="text-[70px] group-hover:scale-75 transition duration-500">
              Shop Now
            </p>
            <IoIosArrowRoundForward className="group-hover:rotate-45 group-hover:-translate-x-10 transition duration-500 group-hover:scale-150 text-[100px]" />
          </button>
        </Link>
      </div>
    </div>
  );
}
