import React, { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";


const Menu = ({ Icon, label, handleChosenMenu, chosenMenu }) => {
  return (
    <Link className="group relative">
    <div className="bg-gray-900 h-full z-0 transition-all duration-300 ease-in-out group-hover:w-full w-0 absolute left-0"></div>
      <div
        onClick={() => handleChosenMenu(label)}
        className={`${
          label === chosenMenu ? "bg-gray-700" : ""
        } z-10 relative flex space-x-2 items-center py-2 pl-2`}
      >
        {Icon}
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default function SellerDashboard() {
  const [chosenMenu, setChosenMenu] = useState("Dashboard");
  const handleChosenMenu = (menu) => {
    setChosenMenu(menu);
  };

  useEffect(() => {
    console.log(chosenMenu);
  }, [chosenMenu]);

  return (
    <div className="flex pt-5">
      <div className="w-[150px] h-screen text-white border-r border-r-gray-500 ">
        <Menu
          Icon={<LuLayoutDashboard />}
          label={"Dashboard"}
          handleChosenMenu={handleChosenMenu}
          chosenMenu={chosenMenu}
        />
        <Menu
          Icon={<BsBoxSeam />}
          label={"Products"}
          handleChosenMenu={handleChosenMenu}
          chosenMenu={chosenMenu}
        />
        <Menu
          Icon={<IoAnalyticsOutline />}
          label={"Analytics"}
          handleChosenMenu={handleChosenMenu}
          chosenMenu={chosenMenu}
        />

      </div>
    </div>
  );
}
