import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsCart } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import useCartStore from "../../store/useCartLocalStorage";
import GlowButton from "../buttons/GlowButton";
import { useAuthStore } from "../../store/useAuthStore";
import { truncateBeforeChar } from "../../utils/helpers";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import AccountDropdown from "./AccountDropdown";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { GiShoppingCart } from "react-icons/gi";
import { CiBellOn } from "react-icons/ci";
import useNotification from "../../store/useNotification";


export default function Navbar({
  bannerIsHidden,
  sidebarIsActive,
  handleSidebar,
}) {
  // const { notificationIsActive, notificationCount } = useNotification();

  const [notificationCount, setNotificationCount] = useState(0)
  const { user, signOut } = useAuthStore();
  const [userName, setUserName] = useState("");
  const location = useLocation();


  const getUserName = () => {
    if (user) {
      setUserName(user.username || truncateBeforeChar(user?.email, "@"));
    }
  };

  const { cartItems } = useCartStore();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [accountDropdownIsActive, setAccountDropdownIsActive] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    setAccountDropdownIsActive,
    accountDropdownIsActive
  );

  useEffect(() => {
    getUserName();
  }, [user]);

  return (
    <div className="sticky top-0 z-50">
      {" "}
      <div
        className={`  ${
          bannerIsHidden ? "-translate-y-52" : " "
        } bg-black w-full h-10 text-center text-white flex  items-center justify-center  transform transition-transform duration-1000 ease-in-out`}
      >
        {" "}
        FREE 2-DAY SHIPPING FOR ORDERS OF $1000 OR MORE
      </div>
      {/* main navbar */}
      <div
        className={`${
          bannerIsHidden ? "-translate-y-8" : ""
        } rounded-xl w-5/6 h-12 bg-white text-black  flex justify-between  mx-auto px-5  items-center   transform transition-transform duration-500 ease-in-out shadow-md`}
      >
        <Link to={"/"}>
          <div className={`${location.pathname === "/" && "font-semibold"}`}>
            <img src="T-logo.png" alt="" className="h-10 rounded" />
            {/* <p>Tech Hub</p>  */}
          </div>
        </Link>

        <span
          onClick={handleSidebar}
          className="cursor-pointer xl:hidden  rounded-full "
        >
          <HiOutlineMenuAlt4 className="text-3xl text-gray-700 hover:text-white hover:bg-black rounded-full p-1 transition duration-300 hover:shadow-xl" />
        </span>
        <div className="xl:flex space-x-2 uppercase hidden">
          <Link to={"/"}>
            <span
              className={`${
                location.pathname === "/" && "bg-gray-200  rounded-md"
              } hover:underline cursor-pointer py-2 px-5 transition-all ease-out duration-700`}
            >
              Home
            </span>
          </Link>
          <Link to={"/shop"}>
            <span
              className={`${
                location.pathname === "/shop" && "bg-gray-200  rounded-md"
              } hover:underline cursor-pointer py-2 px-5 transition-all ease-out duration-700`}
            >
              Shop
            </span>
          </Link>
          <Link to={"/checkout"}>
            <span
              className={`${
                location.pathname === "/checkout" && "bg-gray-200  rounded-md"
              } hover:underline cursor-pointer py-2 px-5 transition-all ease-out duration-700`}
            >
              Checkout
            </span>
          </Link>
          {user &&   <Link to={"/account/myorders"}>
            <span
              className={`${
                location.pathname === "/account/myorders" &&
                "bg-gray-200  rounded-md"
              } hover:underline cursor-pointer py-2 px-5 transition-all ease-out duration-700`}
            >
              My Orders
            </span>
          </Link>}
        
          {(user?.role === "seller" || user?.role === "admin") && (
            <Link to={"/seller-dashboard"}>
              <span
                className={`${
                  location.pathname === "/seller-dashboard" &&
                  "bg-gray-200 rounded-md"
                } hover:underline cursor-pointer py-2 px-5 transition-all ease-out duration-700`}
              >
                Dashboard
              </span>
            </Link>
          )}
        </div>
        <div className="space-x-3 flex items-center">
          <Link to={"/checkout"}>
            <span className="relative grid place-items-center mr-2">
              <GiShoppingCart className="text-xl text-gray-600" />
              <span className="rounded-full absolute -right-2 -top-2 bg-purple-500 w-4 h-4 text-xs text-white grid place-items-center">
                {cartItems.length === 0 ? "0" : totalQuantity}
              </span>
            </span>
          </Link>
          {/* <Link to={"/notifications"}>
            <span className="relative grid place-items-center mr-2">
              <CiBellOn className="text-xl text-gray-600 " />
              <span className="rounded-full absolute -right-1 -top-2 bg-blue-500 w-4 h-4 text-xs text-white grid place-items-center">
                {notificationCount.length === 0 ? "0" : notificationCount}
              </span>
            </span>
          </Link> */}

          {user ? (
            <div className={` relative group flex `}>
              {/* Dropdown */}
              <AccountDropdown
                wrapperRef={wrapperRef}
                signOut={signOut}
                user={user}
                accountDropdownIsActive={accountDropdownIsActive}
                setAccountDropdownIsActive={setAccountDropdownIsActive}
              />

              {/* Avatar and Welcome User */}
              <div
                onClick={() =>
                  setAccountDropdownIsActive(!accountDropdownIsActive)
                }
                className="cursor-pointer text-center flex items-center space-x-2  rounded-md pr-2"
              >
                <img
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  alt=""
                  className="w-10 h-10 rounded-full "
                />
                <p className="text-xs hidden md:flex">{userName}</p>
              </div>
            </div>
          ) : (
            <Link to={"/login"} className="">
              <GlowButton title={"Login"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
