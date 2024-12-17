import React, { useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import MaterialChart from "./MaterialChart"; // Assume this is your chart component
import { motion } from "framer-motion";

export default function DashboardMain() {
  // Fake data
  const salesData = {
    January: 2000,
    February: 2500,
    March: 1800,
    April: 2200,
    May: 2900,
    June: 3100,
    July: 2000,
    August: 2500,
    September: 2700,
    October: 3500,
    November: 4000,
    December: 5520,
  };

  const averageOrderValue = {
    January: 50,
    February: 35,
    March: 29,
    April: 55,
    May: 59,
    June: 71,
    July: 80,
    August: 85,
    September: 97,
    October: 85,
    November: 120,
    December: 150,
  };

  const totalOrders = {
    January: 120,
    February: 110,
    March: 90,
    April: 130,
    May: 10,
    June: 100,
    July: 60,
    August: 70,
    September: 100,
    October: 120,
    November: 130,
    December: 200,
  };

  const [currentMonth, setCurrentMonth] = useState("December");

  // Get current and previous data
  const months = Object.keys(salesData);
  const salesValues = Object.values(salesData);
  const currentIndex = months.indexOf(currentMonth);

  const currentMonthSales = salesData[currentMonth];
  const currentMonthOrders = totalOrders[currentMonth];
  const currentMonthAOV = averageOrderValue[currentMonth];

  const previousMonth = currentIndex > 0 ? months[currentIndex - 1] : null;
  const previousMonthSales = previousMonth ? salesData[previousMonth] : null;
  const previousMonthOrders = previousMonth ? totalOrders[previousMonth] : null;
  const previousMonthAOV = previousMonth
    ? averageOrderValue[previousMonth]
    : null;

  // Calculate percentage changes
  const calculatePercentageChange = (current, previous) =>
    previous ? ((current - previous) / previous) * 100 : 0;

  const salesChange = calculatePercentageChange(
    currentMonthSales,
    previousMonthSales
  );
  const ordersChange = calculatePercentageChange(
    currentMonthOrders,
    previousMonthOrders
  );
  const aovChange = calculatePercentageChange(
    currentMonthAOV,
    previousMonthAOV
  );

  // Stat Component
  const StatCard = ({ label, value, change }) => (
    <motion.div className="w-[300px] bg-white text-black p-4 rounded-lg shadow-md">
      <p className="font-semibold text-gray-800 ">{label}</p>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-between items-end mt-2"
      >
        {label === "Total Orders" ? (
          <p className="text-xl font-bold">{value}</p>
        ) : (
          <p className="text-xl font-bold">${value}</p>
        )}

        <div>
          <div
            className={`flex items-center space-x-1 font-semibold justify-self-end ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 ? <IoArrowUp /> : <IoArrowDown />}
            <span>{change.toFixed(2)}%</span>
          </div>
          <p>Compared to {previousMonth}</p>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="p-5">
      <p className="font-semibold text-xl mb-4">Dashboard</p>

      {/* Month Selector */}
      <div className="mb-5">
        <label htmlFor="month" className="font-semibold">
          Select Month:
        </label>
        <select
          id="month"
          className="ml-2 p-2   rounded-md text-white bg-purple-500"
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Section */}
      <div className="flex space-x-5 justify-center">
        <StatCard
          label="Total Sales"
          value={currentMonthSales}
          change={salesChange}
        />
        <StatCard
          label="Average Order Value"
          value={currentMonthAOV}
          change={aovChange}
        />
        <StatCard
          label="Total Orders"
          value={currentMonthOrders}
          change={ordersChange}
        />
      </div>

      {/* Chart */}
      <div className="mt-10">
        <MaterialChart months={months} salesValues={salesValues} />
      </div>
      {/* <AnalyticsWithCharts /> */}
      {/* <Analytics /> */}
    </div>
  );
}
