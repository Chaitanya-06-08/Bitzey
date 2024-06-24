import React from "react";
import { sidebarActions } from "../store/Sidebar";
import { useDispatch } from "react-redux";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Hamburger = () => {
  const sidebarDispatch = useDispatch();
  return (
    <button
      className="absolute rounded-r-xl bg-brand-primary left-0 top-20 animate-bounce py-2 px-4"
      onClick={() => {
        sidebarDispatch(sidebarActions.toggleSideBar());
      }}
    >
      <IoIosArrowDroprightCircle className=" text-white text-3xl" />
    </button>
  );
};

export default Hamburger;
