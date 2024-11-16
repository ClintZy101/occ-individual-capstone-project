
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const LinkTag = ({ text, href }) => (
    <Link to={href}>
      <p className="uppercase cursor-pointer hover:underline">{text}</p>
    </Link>
  );
  return (
    <div className="text-white  bg-purple-600 p-5">
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-5  ">
        <div className="grid gap-2">
          <p className="uppercase">Have a question?</p>
          <p className="uppercase">Explore our help center</p>
          <Link to={"/helpcenter"}>
            <button className="border border-white  hover:bg-white hover:text-black transition duration-300  px-4 py-2 w-max h-10">
              VIEW MORE
            </button>
          </Link>
        </div>
        <div>
          <p className="uppercase mb-2">Shop</p>
          <LinkTag text={"All products"} href={"/shop"} />
          <LinkTag text={"Best Sellers"} href={"/bestsellers"} />
          <LinkTag text={"sale"} href={"/sale"} />
        </div>
        <div>
          <p className="uppercase mb-2">contact</p>
          <LinkTag text={"info@mysite.com"} href={"/"} />
          <LinkTag
            text={"AB 002 ambiong, la trinidad, benguet, 2601"}
            href={
              "https://www.google.com/maps/place/Ambiong+Elementary+School/@16.4364374,120.6017729,17z/data=!3m1!4b1!4m6!3m5!1s0x3391a3eebe4048f7:0xdda0260d9fdfbb93!8m2!3d16.4364323!4d120.6043478!16s%2Fg%2F1tcyb_8j?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D"
            }
          />
        </div>
        <div>
          <p className="uppercase mb-2">Follow</p>
          <LinkTag text={"instagram"} href={"https://www.instagram.com"} />
          <LinkTag text={"facebook"} href={"https://www.facebook.com"} />
          <LinkTag text={"tiktok"} href={"https://www.tiktok.com"} />
          <LinkTag text={"youtube"} href={"https://www.youtube.com"} />
        </div>
        <div>
          <p className="uppercase mb-2">legal</p>
          <p className="uppercase">terms and conditions</p>
          <p className="uppercase">privacy policy</p>
          <p className="uppercase">shipping policy</p>
          <p className="uppercase">refund policy</p>
          <p className="uppercase">accessibility statement</p>
        </div>
      </div>
      <p className="mt-5">©2024 by Clint. Design by SIINAX on WIX TUDIO</p>
    </div>
  );
}
