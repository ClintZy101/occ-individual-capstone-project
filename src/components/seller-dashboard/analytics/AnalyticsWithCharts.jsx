import React from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";

export default function AnalyticsWithCharts() {
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

  const months = Object.keys(salesData);
  const salesValues = Object.values(salesData);
  const [year] = React.useState(2024);

  // Calculate analytics
  const totalSales = salesValues.reduce((sum, value) => sum + value, 0);
  const averageMonthlySales = (totalSales / salesValues.length).toFixed(2);
  const bestMonthIndex = salesValues.indexOf(Math.max(...salesValues));
  const bestMonth = months[bestMonthIndex];
  const percentageGrowth =
    ((salesValues[salesValues.length - 1] - salesValues[0]) / salesValues[0]) *
    100;

  // Chart Configurations
  const lineChartConfig = {
    series: [
      {
        name: "Sales",
        data: salesValues,
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: ["#0284c7"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories: months,
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "12px",
          },
        },
      },
      grid: {
        borderColor: "#e2e8f0",
        strokeDashArray: 5,
      },
    },
  };

  const pieChartConfig = {
    series: salesValues,
    options: {
      chart: {
        type: "pie",
      },
      labels: months,
      colors: [
        "#0284c7",
        "#7dd3fc",
        "#0ea5e9",
        "#0369a1",
        "#1e40af",
        "#3b82f6",
        "#38bdf8",
        "#60a5fa",
        "#2563eb",
        "#9333ea",
        "#ec4899",
        "#14b8a6",
      ],
      legend: {
        position: "bottom",
        labels: {
          colors: "white", // Change the legend text color to white
        },
      },
      dataLabels: {
        style: {
          colors: ["white"], // Change the text color inside the pie slices to white
        },
      },
    },
  };
  

  return (
    <div className="p-5 rounded-lg shadow-lg space-y-8">
      <h2 className="text-lg font-semibold">Analytics Overview</h2>

      {/* Total Sales and Average Sales */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <h3 className="text-sm  text-white">Total Sales {year}</h3>
          <p className="text-2xl font-bold text-white">${totalSales}</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <h3 className="text-sm text-white">Average Monthly Sales</h3>
          <p className="text-2xl font-bold text-white">
            ${averageMonthlySales}
          </p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <h3 className="text-sm text-white">Best Performing Month</h3>
          <p className="text-2xl font-bold text-white">{bestMonth}</p>
        </div>
        <div
          className={`bg-gray-800 p-5 rounded-lg shadow-md ${
            percentageGrowth >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <h3 className="text-sm text-white">Year-to-Date Growth</h3>
          <p className="text-2xl font-bold">
            {percentageGrowth >= 0 ? "+" : ""}
            {percentageGrowth.toFixed(2)}%
          </p>
        </div>
      </motion.div>

      {/* Pie Chart */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-md">
        <h3 className="text-sm text-white">Sales Distribution</h3>
        <Chart
          options={pieChartConfig.options}
          series={pieChartConfig.series}
          type="pie"
          height={300}
        />
      </div>
      {/* Line Chart */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-md">
        <h3 className="text-sm text-white">Sales Trends (Monthly)</h3>
        <Chart
          options={lineChartConfig.options}
          series={lineChartConfig.series}
          type="line"
          height={300}
        />
      </div>
    </div>
  );
}


