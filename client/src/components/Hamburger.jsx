import React from "react";
import { sidebarActions } from "../store/Sidebar";
import { useDispatch } from "react-redux";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Hamburger = () => {
  const sidebarDispatch = useDispatch();
  return (
    <button
      className=" bg-brand-primary left-0 top-16 py-2  hover:bg-brand-secondary h-screen px-2 font-brandFont z-40 w-[3%]"
      onClick={() => {
        sidebarDispatch(sidebarActions.toggleSideBar());
      }}
    >
      <IoIosArrowDroprightCircle className=" text-white text-3xl" />
    </button>
  );
};

export default Hamburger;
