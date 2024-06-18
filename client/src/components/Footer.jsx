import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 2,
          type: "tween",
        },
      }}
      className="w-full flex justify-between bg-gray-100 text-brand-secondary font-brandFont py-12 px-4 mt-4"
    >
      <div className="flex flex-col items-start justify-between">
        <h1 className="text-3xl italic font-semibold">Bitzey</h1>
        <p>Your favourite food ordering experience</p>
        <p>Bitzey &copy; 2024</p>
      </div>

      <ul className="flex flex-col space-y-2">
        <li>
          <NavLink to="#">Assistance</NavLink>
        </li>
        <li>
          <NavLink to="#">FAQs</NavLink>
        </li>
        <li>
          <NavLink to="#">About Us</NavLink>
        </li>
        <li>
          <NavLink to="#">Policy</NavLink>
        </li>
        <li>
          <NavLink to="#">Legal Terms</NavLink>
        </li>
      </ul>
    </motion.div>
  );
};

export default Footer;
