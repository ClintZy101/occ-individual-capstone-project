import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SellerNotificationTable from "../components/notifications/SellerNotificationTable";
import BuyerNotificationTable from "../components/notifications/BuyerNotificationTable";

export default function Notifications() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen p-5">
        <p className="font-bold text-white text-2xl mt-10 text-center w-full ">
          Please Login first...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {user?.role === "seller" ||
        (user?.role === "admin" && <SellerNotificationTable />)}
      {user?.role === "buyer" && <BuyerNotificationTable />}
    </div>
  );
}
