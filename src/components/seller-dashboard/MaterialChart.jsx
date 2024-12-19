import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MaterialChart({ salesValues, months }) {
  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: salesValues,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        background: "#1f2937", // Dark gray background
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#38bdf8"], // Light blue line
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#d1d5db", // Light gray text
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: months,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#d1d5db", // Light gray text
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#374151", // Darker gray grid lines
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark", // Ensures the tooltip matches night mode
      },
    },
  };
  
  return (
    <Card className="bg-gray-800 px-5 text-white">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg  p-5 bg-gray-900 ">
          <Square3Stack3DIcon className="h-6 w-6 text-white " />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray text" className="text-white">
            Sales Chart
          </Typography>
          <Typography
            variant="small"
            color="white"
            className="max-w-sm font-normal"
          >
            Visualized Data for the year 2024
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
