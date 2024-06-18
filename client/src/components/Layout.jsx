import React from "react";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { getState } from "../util/getState";
const Layout = () => {
  const showSidebar = getState("sidebar");
  return (
    <div className="bg-white w-full h-full flex font-brand-primaryFont">
      <div></div>
      {showSidebar && <Sidebar/>}
      <div className={`${showSidebar? "w-4/5":"w-full"} h-screen overflow-y-scroll`}>
        {/* navigation */}
        <Navigation></Navigation>

        {/* outlet */}
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;
