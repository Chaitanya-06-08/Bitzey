import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const RevenueGraph = ({ revenueData }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let revenueEachMonth = [];
  revenueData?.forEach((month) => {
    revenueEachMonth[month._id] = month.totalRevenueOfMonth;
  });
  console.log(revenueEachMonth);
  for (let i = 0; i < 11; i++) {
    if (revenueEachMonth[i] == undefined) revenueEachMonth[i] = 0;
  }
  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueEachMonth,
        backgroundColor: "#fd2e2e",
        borderRadius: 3,
      },
    ],
  };
  const options = {
    responsive: true,
    aspectRatio: 1.4,
    plugins: {
      title: {
        display: true,
        text: "Annul Revenue",
        font: {
          size: 24,
          family: "Poppins,sans-serif",
          weight: "bold",
        },
        color: "red",
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 15,
            family: "Poppins,sans-serif",
          },
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
  //   return <></>;
};

export default RevenueGraph;
