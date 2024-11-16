import React from "react";
import HeroCTA from "../buttons/HeroCTA";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Hero2() {
  return (
    <div className="relative -mt-10  bg-[url('https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] w-screen h-screen bg-cover grid place-items-center bg-center">

      <div className="bg-black w-full h-full text-white   bg-opacity-50 p-5  text-center grid gap-2 ">
        <div>
          <h1 className="md:text-[200px] text-[100px]  md:mt-[50px] mt-[100px]  font-serif"> Discover</h1>
          <p className="md:text-[30px] text-[20px] md:-mt-10  mb-10 font-light">
            Top-quality gadgets designed to elevate your lifestyle
          </p>
          <Link to={"/shop"}>
          <HeroCTA text="Shop Now" Icon={IoIosArrowRoundForward}/>
          </Link>
        </div>
      </div>
    </div>
  );
}
