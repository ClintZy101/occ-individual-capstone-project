import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

export default function AccountDropdown({
  wrapperRef,
  accountDropdownIsActive,
  setAccountDropdownIsActive,
  user,
  signOut,
}) {
  // const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    // navigate(`/account/myorders`);
    setAccountDropdownIsActive(!accountDropdownIsActive);
  };
  const handleLogout = () => {
    alert("You have been logged out.");
    signOut();
  };

  const LinkButton = ({ title, link }) => (
    <Link to={link}>
    <p  
    onClick={()=>setAccountDropdownIsActive(false)}
    className="cursor-pointer border border-customBrown text-center py-2 hover:bg-customBrown rounded hover:bg-gray-500">{title}</p>
    </Link>
  )

  const renderLinks = () => {
    switch (user?.role) {
      case "admin":
        return (
          <LinkButton title="User Management" link="/user-management" />
        );
      case "seller":
        return (
          <LinkButton title="Seller Dashboard" link="/seller-dashboard" />
        );
      case "buyer":
        return (
          <LinkButton title="My Orders" link="/account/myorders" />
        );
    }
  };

  return (
    <AnimatePresence>
      {accountDropdownIsActive && (
        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden={!accountDropdownIsActive}
          className="grid px-10 py-5 gap-5 absolute -bottom-[170px] right-0 rounded-lg bg-black text-white min-w-[300px] "
        >
          <span className="border-b  pb-2">
            <strong>Signed In as:</strong>
            <br />
            {user?.email}
          </span>

          {renderLinks()}

          <span
            tabIndex="1"
            onClick={handleLogout}
            className="cursor-pointer bg-black text-white px-5 py-1 rounded hover:rounded-full font-semibold transition-all text-center border border-customBrown-light"
          >
            Logout
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
