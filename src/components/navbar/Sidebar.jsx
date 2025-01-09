import React from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Sidebar({ sidebarIsShown, handleSidebar }) {
  const {user} = useAuthStore()
  const dashboard = () =>{
    if(user?.role === "admin" || user?.role === "seller"){
      return { name: "Dashboard", link: "/seller-dashboard" }
    } else if(user?.role === "buyer" || user === null){
      return {}
  }
}
  
  const links = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Checkout", link: "/checkout" },
    { name: "My Orders ", link: "/account/myorders" },
    dashboard(),

  ];

  const navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
    handleSidebar();
  };

  return (
    <div
      className={`z-50 fixed top-0 left-0 w-screen h-full  flex  text-white transform transition-all duration-300 ${
        sidebarIsShown
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      {/* Close Button */}
      <span
        onClick={handleSidebar}
        className="absolute top-5 left-5 cursor-pointer text-3xl group z-50"
      >
        <RiCloseLargeFill className="transition-transform duration-300 group-hover:rotate-180" />
      </span>
      <div className="grid place-items-center  bg-black text-white md:w-1/2  w-screen h-full ">
        <div className="grid gap-10 ">
          {links.map((link, index) => (
            <span
              key={index}
              onClick={() => handleNavigate(link.link)}
              className="text-3xl cursor-pointer font-bold hover:underline"
            >
              {link.name}
            </span>
          ))}
        </div>
      </div>
      <div
        onClick={handleSidebar}
        className="bg-black opacity-70 hidden md:block  md:w-1/2 "
      ></div>
    </div>
  );
}
