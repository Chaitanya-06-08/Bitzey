import React, { useRef } from "react";
import Darktoggle from "./DarkToggle";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/delivery.png";
import { getState } from "../util/getState";
import { CgProfile } from "react-icons/cg";
import CartModal from "./CartModal";
import { useDispatch } from "react-redux";
import { sidebarActions } from "../store/Sidebar";
import useCartModalRef from "../hooks/useCartModalRef";
const Navigation = () => {
  const navVariants = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    current: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 250,
        duration: 1,
      },
    },
  };

  const navLinkClasses =
    "hover:bg-brand-primary hover:text-white transition-all";

  const user = getState("user");
  const cart = getState("cart");
  const cartref = useCartModalRef();
  const dispatch = useDispatch();
  // console.log(user);
  return (
    <motion.div
      variants={navVariants}
      initial="initial"
      animate="current"
      className="flex items-center justify-between font-brandFont shadow-lg text-brand-primary text-xl sticky top-0 z-50 bg-white"
    >
      <NavLink
        to="/"
        className={`${user.usertype == "restaurant" ? "w-1/3" : ""}`}
      >
        <div className="flex items-center ml-4 space-x-2">
          <img src={logo} alt="Brand Logo" className="size-12" />
          <h1 className="text-3xl text-brand-primary italic font-bold">
            Bitzey
          </h1>
        </div>
      </NavLink>

      {/* home,restaraunts,about us  */}
      {user.usertype != "restaurant" && (
        <ul className=" list-none flex justify-end my-4 w-2/3 ">
          <div className="bg-white border-2 border-brand-primary rounded-3xl flex divide-x-2">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return (
                  (isActive ? `bg-brand-primary text-white ` : ``) +
                  navLinkClasses +
                  ` rounded-l-3xl`
                );
              }}
            >
              <li className="px-5">Home</li>
            </NavLink>
            <NavLink
              to="/restaurants"
              className={({ isActive }) => {
                return (
                  (isActive ? `bg-brand-primary text-white ` : ``) +
                  navLinkClasses
                );
              }}
            >
              <li className="px-5">Restaurants</li>
            </NavLink>
            <NavLink
              to="/auth/partner-with-us-restaurant"
              className={({ isActive }) => {
                return (
                  (isActive ? `bg-brand-primary text-white ` : ``) +
                  navLinkClasses
                );
              }}
            >
              <li className="hover:bg-brand-primary hover:text-white transition-all px-5 ">
                Add your restaraunt
              </li>
            </NavLink>
            <NavLink
              to="aboutus"
              className={({ isActive }) => {
                return (
                  (isActive ? `bg-brand-primary text-white ` : ``) +
                  navLinkClasses +
                  ` rounded-r-3xl`
                );
              }}
            >
              <li className="px-5">About Us</li>
            </NavLink>
          </div>
        </ul>
      )}

      {user?.usertype == "restaurant" && (
        <h1 className="text-2xl text-brand-primary font-bold text-center w-1/3">
          Restaurant Partner Page
        </h1>
      )}

      {/* Cart, dark mode */}
      <ul className="flex items-center space-x-4 w-1/3 justify-end px-10 h-16">
        {user.usertype != "restaurant" && (
          <li
            className="flex items-center justify-center space-x-2 cursor-pointer h-fit p-3 hover:bg-brand-primary hover:text-white rounded-xl transition-all"
            onClick={() => {
              cartref.current.showModal();
            }}
          >
            <FaCartShopping />
            <span className="rounded-full text-white bg-brand-primary px-1 text-base">
              {cart.totalQuantity}
            </span>
          </li>
        )}
        {user?.isLoggedIn && (
          <CgProfile
            className="cursor-pointer text-3xl"
            onClick={() => {
              dispatch(sidebarActions.toggleSideBar());
            }}
          />
        )}
        {!user?.isLoggedIn && (
          <div className="flex space-x-2 items-center">
            <NavLink to="/auth/" className="btn-third-primary">
              Login
            </NavLink>
            <NavLink to="/auth/" className="btn-third-secondary">
              SignUp
            </NavLink>
          </div>
        )}
        {/* <li className="my-4 relative ">
          <Darktoggle />
        </li> */}
      </ul>
      <CartModal ref={cartref} />
    </motion.div>
  );
};

export default Navigation;
