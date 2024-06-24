import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const CategoryGraph = ({ categoryData }) => {
  const data = {
    labels: categoryData?.map((category) => category._id),
    datasets: [
      {
        label: "Count",
        data: categoryData?.map((category) => category.categoryCount),
      },
    ],
  };
  const options = {
    responsive: true,
    aspectRatio:1.3,
    plugins: {
      title: {
        display: true,
        text: "Food Category Data",
        font: {
          size: 24,
          family: "Poppins,sans-serif",
          weight:'bold'
        },
        color:"red"
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
  return <Doughnut data={data} options={options} />;
};

export default CategoryGraph;
