import React from "react";
import Sidebar from "../Sidebar";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";
import { getState } from "../../util/getState";
import Hamburger from "../Hamburger";
const Layout = () => {
  const showSidebar = getState("sidebar");
  return (
    <div className="bg-white w-full h-full flex font-brand-primaryFont">
      <div></div>
      {showSidebar && <Sidebar/>}
      {!showSidebar && (
        <Hamburger/>
      )}
      <div className={`${showSidebar? "w-4/5":"w-full"} h-screen overflow-y-scroll`}>
        {/* navigation */}
        <Navigation></Navigation>

        {/* outlet */}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
