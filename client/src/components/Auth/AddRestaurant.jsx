import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu";
import Footer from "../Footer";
import Navigation from "../Navigation";
const RestaurantLogin = () => {
  return (
    <>
      <Navigation />
      <div className="w-full text-center bg-brand-primary font-brandFont py-12">
        <div className="flex flex-col items-center space-y-6 py-6">
          <h1 className="text-5xl italic underline text-white font-bold animate-bounce">
            Wanna partner with us?
          </h1>
          <h1 className="text-3xl text-brand-third">
            Choose the below options
          </h1>
          <div className="flex space-x-3">
            <NavLink to="/auth/signup/restaurant" className="btn-primary">
              Register Your Restaurant
            </NavLink>
            <NavLink to="/auth/login/restaurant" className="btn-secondary">
              Login to existing account
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full text-center bg-gray-100 font-brandFont py-12 px-10">
        <div className="bg-white mx-10 rounded-2xl shadow-lg px-12">
          <div className="flex flex-col items-center space-y-6 py-6">
            <h1 className="text-3xl  text-brand-primary font-semibold">
              Why should you partner with Bitzey?
            </h1>
            <h1 className="text-xl text-black">
              Bitzey enables you to get 60% more revenue, 10x new customers and
              boost your brand visibility by providing insights to improve your
              business.
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full text-center bg-brand-primary font-brandFont py-12">
        <div className="flex flex-col items-center space-y-6 py-6">
          <h1 className="text-3xl text-white font-semibold">
            How does it work?
          </h1>
          <div className="flex items-center py-4 space-x-4">
            <div className="flex flex-col items-center w-80 space-y-4 bg-white rounded-xl py-8 h-80">
              <MdOutlineDocumentScanner className="text-brand-primary text-6xl w-full my-2" />
              <h1 className="text-xl font-semibold">Step 1</h1>
              <p className="text-lg">Fill your restaurant details</p>
              <p className="font-light px-4">
                Tell us about your place so that customers can see it
              </p>
            </div>
            <div className="flex flex-col items-center w-80 space-y-4 bg-white rounded-xl py-8 h-80">
              <RiPagesLine className="text-brand-primary text-6xl w-full my-2" />
              <h1 className="text-xl font-semibold">Step 2</h1>
              <p className="text-lg">Create your page at bitzey</p>
              <p className="font-light px-4">
                Add exicting things to your restaurant profile so that customers
                find them attractive
              </p>
            </div>
            <div className="flex flex-col items-center w-80 space-y-4 bg-white rounded-xl py-8 h-80">
              <LuPackageCheck className="text-brand-primary text-6xl w-full my-2" />
              <h1 className="text-xl font-semibold">Step 3</h1>
              <p className="text-lg">Start receiving orders online</p>
              <p className="font-light px-4">
                Manage orders on our partner app, web dashboard or API partners
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RestaurantLogin;
