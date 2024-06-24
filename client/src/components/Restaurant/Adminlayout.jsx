import React from "react";
import Sidebar from "../Sidebar";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";
import { getState } from "../../util/getState";
import Hamburger from "../Hamburger";
import Loader from "../Loader";
import ProfileImageEdit from "../ProfileImageEdit";
import Modal from "../Modal";
const Layout = () => {
  const showSidebar = getState("sidebar");
  const showModal = getState("modal");
  return (
    <>
      <div className="bg-white w-full h-full flex font-brand-primaryFont">
        <div></div>
        {showSidebar && <Sidebar />}
        {!showSidebar && <Hamburger />}
        <div
          className={`${
            showSidebar ? "w-4/5" : "w-full"
          } h-screen overflow-y-scroll`}
        >
          {/* navigation */}
          <Navigation></Navigation>

          {/* outlet */}
          <Outlet></Outlet>
        </div>
      </div>
      {showModal == "profileImageEdit" && (
        <Modal modalWidth="w-1/3 p-8">
          <ProfileImageEdit/>
        </Modal>
      )}
    </>
  );
};

export default Layout;
