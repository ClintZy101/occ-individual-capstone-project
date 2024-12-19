import React, { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import DashboardMain from "../components/seller-dashboard/DashboardMain";
import AnalyticsWithCharts from "../components/seller-dashboard/AnalyticsWithCharts";
import { MdShoppingCartCheckout } from "react-icons/md";
import Listings from "../components/seller-dashboard/listings/Listings";
// Menu Item Component
const Menu = ({ Icon, label, handleChosenMenu, chosenMenu }) => {
  return (
    <Link className="group relative">
      <div className="bg-gray-900 h-full z-0 transition-all duration-300 ease-in-out group-hover:w-full w-0 absolute left-0"></div>
      <div
        onClick={() => handleChosenMenu(label)}
        className={`${
          label === chosenMenu ? "bg-gray-700" : ""
        } z-10 relative flex space-x-2 items-center py-2 pl-2 cursor-pointer`}
      >
        {Icon}
        <p>{label}</p>
      </div>
    </Link>
  );
};

// Main Component
export default function SellerDashboard() {
  const [chosenMenu, setChosenMenu] = useState("Dashboard");

  const handleChosenMenu = (menu) => {
    setChosenMenu(menu);
  };

  useEffect(() => {
    console.log(chosenMenu);
  }, [chosenMenu]);

  // Render content based on chosenMenu
  const renderContent = () => {
    switch (chosenMenu) {
      case "Dashboard":
        return <DashboardMain />;
      case "Listings":
        return <Listings />;
        case "Orders":
          return <div>Orders</div>
      case "Analytics":
        return <AnalyticsWithCharts/>;
      default:
        return <div>Select a menu option to see its content.</div>;
    }
  };

  return (
    <div className="flex pt-5">
      {/* Sidebar */}
      <div className="w-[170px] h-screen text-white border-r-[0.5px] border-r-gray-500 px-2">
        <Menu
          Icon={<LuLayoutDashboard />}
          label="Dashboard"
          handleChosenMenu={handleChosenMenu}
          chosenMenu={chosenMenu}
        />
        <Menu
          Icon={<BsBoxSeam />}
          label="Listings"
          handleChosenMenu={handleChosenMenu}
          chosenMenu={chosenMenu}
        />
        <Menu
          Icon={<MdShoppingCartCheckout />}
          label="Orders"
          handleChosenMenu={handleChosenMenu}
          chosenMenu={chosenMenu}
        />
        <Menu
          Icon={<IoAnalyticsOutline />}
          label="Analytics"
          handleChosenMenu={handleChosenMenu}
          chosenMenu={chosenMenu}
        />
      </div>


      {/* Output Section */}
      <div className="flex-1 px-5 text-white">{renderContent()}</div>
    </div>
  );
}
