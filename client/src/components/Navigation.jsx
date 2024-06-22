import React, { useRef } from "react";
import Darktoggle from "./DarkToggle";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/delivery.png";
import { getState } from "../util/getState";
import CartModal from "./CartModal";
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
    "hover:bg-brand-primary hover:text-white transition-all px-5";

  const user = getState("user");
  const cart = getState("cart");
  const cartref=useRef()

  // console.log(user);
  return (
    <motion.div
      variants={navVariants}
      initial="initial"
      animate="current"
      className="flex items-center justify-between font-brandFont shadow-lg text-brand-primary text-xl sticky top-0 z-50 bg-white"
    >
      <NavLink to="/">
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
            <NavLink to="/">
              <li className={`${navLinkClasses} hover:rounded-l-3xl`}>Home</li>
            </NavLink>
            <NavLink to="/restaurants">
              <li className={`${navLinkClasses}`}>Restaurants</li>
            </NavLink>
            <NavLink to="/auth/partner-with-us-restaurant">
              <li className="hover:bg-brand-primary hover:text-white transition-all px-5 ">
                Add your restaraunt
              </li>
            </NavLink>
            <NavLink to="#">
              <li className={`${navLinkClasses} hover:rounded-r-3xl`}>
                About Us
              </li>
            </NavLink>
          </div>
        </ul>
      )}

      {/* Cart, dark mode */}
      <ul className="flex items-center space-x-4 w-1/3 justify-end px-10 h-16">
        {user.usertype != "restaurant" && (
          <li className="relative flex items-center justify-center space-x-2 cursor-pointer h-fit p-3 hover:bg-brand-primary hover:text-white rounded-xl transition-all"
          onClick={()=>{cartref.current.showModal()}}>
            <FaCartShopping />
            <span className=" top-0 right-0 rounded-3xl text-white bg-brand-primary px-1 text-base">
              {cart.totalQuantity}
            </span>
          </li>
        )}
        <li className="my-4 relative ">
          <Darktoggle />
        </li>
      </ul>
      <CartModal ref={cartref}/>
    </motion.div>
  );
};

export default Navigation;
