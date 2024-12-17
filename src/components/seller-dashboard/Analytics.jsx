import React from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

export default function Analytics() {
  // Fake sales data
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

  // Extract sales values
  const salesValues = Object.values(salesData);
  const months = Object.keys(salesData);

  // Calculate analytics
  const totalSales = salesValues.reduce((sum, value) => sum + value, 0);
  const averageMonthlySales = (totalSales / salesValues.length).toFixed(2);
  const bestMonthIndex = salesValues.indexOf(Math.max(...salesValues));
  const bestMonth = months[bestMonthIndex];
  const percentageGrowth =
    ((salesValues[salesValues.length - 1] - salesValues[0]) /
      salesValues[0]) *
    100;

  return (
    <div className="mt-8 p-5 bg-gray-50 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-800">Analytics Overview</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {/* Total Sales */}
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Sales (Year)</p>
          <p className="text-2xl font-bold text-gray-800">${totalSales}</p>
        </div>

        {/* Average Monthly Sales */}
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Average Monthly Sales</p>
          <p className="text-2xl font-bold text-gray-800">
            ${averageMonthlySales}
          </p>
        </div>

        {/* Best Month */}
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Best Performing Month</p>
          <p className="text-2xl font-bold text-gray-800">{bestMonth}</p>
        </div>

        {/* Percentage Growth */}
        <div
          className={`p-4 bg-white rounded-lg shadow-sm border ${
            percentageGrowth >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <p className="text-sm text-gray-500">Year-to-Date Growth</p>
          <div className="flex items-center space-x-2">
            {percentageGrowth >= 0 ? (
              <IoArrowUp className="text-xl" />
            ) : (
              <IoArrowDown className="text-xl" />
            )}
            <p className="text-2xl font-bold">
              {percentageGrowth.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
