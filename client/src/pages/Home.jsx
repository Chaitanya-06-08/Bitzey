import React from "react";
import deliveryimage from "../assets/home-image.jpg";
import ShowcaseContent from "../components/ShowcaseContent";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { getState } from "../util/getState";
import Hamburger from "../components/Hamburger";
const Home = () => {
  const contentVariants = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    current: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 6,
        stiffness: 100,
        duration: 1,
      },
    },
  };
  const showSidebar = getState("sidebar");
  return (
    <>
      <main className={`${showSidebar?"":"mx-auto max-w-[83.3333333%]"}`}>
      {!showSidebar && (
        <Hamburger/>
      )}
        <div
          className={` flex items-center justify-center px-8 font-brandFont`}
          id="Content"
        >
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="current"
            className="flex flex-col w-3/5 bg-brand-primary rounded-lg text-white p-5 space-y-3 shadow-2xl"
          >
            <h1 className="text-5xl italic font-bold underline">Bitzey</h1>
            <h2 className="text-2xl">
              Your one stop destination for decilcious food
            </h2>
            <p>
              Choose your favourite meal from our broad selection of
              available restaurants and enjoy a delicious lunch or dinner at home
            </p>
            <NavLink to="/restaurants">
              <button className="btn-primary w-fit">Order Now</button>
            </NavLink>
          </motion.div>
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="current"
            className="w-2/5 rounded-lg "
          >
            <img src={deliveryimage} alt="" className="object-cover" />
          </motion.div>
        </div>

        <ShowcaseContent></ShowcaseContent>
      </main>
    </>
  );
};

export default Home;
