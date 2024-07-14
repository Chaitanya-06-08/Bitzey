import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { NavLink } from "react-router-dom";

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
    aspectRatio: 1.3,
    plugins: {
      title: {
        display: true,
        text: "Food Category Data",
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
  return (
    <>
      {categoryData?.length > 0 ? (
        <Doughnut data={data} options={options} />
      ) : (
        <div className="flex items-center flex-col space-y-10">
          <h1 className="text-2xl text-brand-primary font-bold">
            Category Data
          </h1>
          <h1 className="text-xl text-brand-primary">
            No Food Items were added to the menu.....
          </h1>
          <NavLink className="btn-primary" to="/restaurant/addmenuitem">
            Add Food Items
          </NavLink>
        </div>
      )}
    </>
  );
};

export default CategoryGraph;
