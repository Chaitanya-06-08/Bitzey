import React from "react";
import Navigation from "../Navigation";
import { NavLink } from "react-router-dom";

const PreLogin = () => {
  return (
    <>
      <Navigation />
      <div className="bg-brand-primary rounded-xl w-1/2 mx-auto mt-12 flex flex-col space-y-8 font-brandFont p-8">
        <div className="flex flex-col space-y-2 items-center justify-center text-white">
          <h1 className="text-3xl">Customer</h1>
          <p className="text-xl text-center">
            Wanna order delicious food at your door step?
          </p>
          <div className="flex space-x-4">
            <NavLink to="signup/customer" className="btn-primary">
              Sign Up
            </NavLink>
            <NavLink to="login/customer" className="btn-secondary">
              Sign In
            </NavLink>
          </div>
        </div>
        <div className="flex items-center">
          <span className="bg-gray-100 w-full h-[2px]"></span>
          <p className="text-gray-100 w-full text-center">or </p>
          <span className="bg-gray-100 w-full h-[2px]"></span>
        </div>
        <div className="flex flex-col space-y-2 items-center justify-center text-white">
          <h1 className="text-3xl">Restaurant</h1>
          <p className="text-xl text-center">
            Looking to partner with the best online restaurant business merchandise?
          </p>
          <div className="flex space-x-4">
            <NavLink to="signup/restaurant" className="btn-primary">
              Register
            </NavLink>
            <NavLink to="login/restaurant" className="btn-secondary">
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreLogin;
