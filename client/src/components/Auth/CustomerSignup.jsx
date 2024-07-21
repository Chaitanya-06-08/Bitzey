import React, { useState } from "react";
import SignupImage from "../../assets/Sign up.gif";
import Loader from "../Loader";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "../../util/axios";
import { loadingActions } from "../../store/Loading";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation";
const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordType: "password",
  });

  const showLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const signup = async ({ username, email, password, confirmPassword }) => {
    dispatch(loadingActions.toggleLoading());
    try {
      const response = await axios.post(
        "/api/signup/customer",
        {
          username,
          email,
          password,
          confirmPassword,
          usertype: "customer",
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status == 200) {
        toast.success(response.data.message, { duration: 4000 });
        setSignupDetails({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response.data.message, { duration: 4000 });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    dispatch(loadingActions.toggleLoading());
  };

  const formChangeHandler = (e) => {
    setSignupDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value.trim(),
      };
    });
  };

  const formsubmitHandler = (e) => {
    e.preventDefault();
    let { username, email, password, confirmPassword } = signupDetails;
    if (!(username && email && password && confirmPassword)) {
      toast.error("Hey there, you left some fields empty", {
        duration: 5000,
      });
    } else if (confirmPassword !== password) {
      toast.error("Passwords are not matching", {
        duration: 5000,
      });
    } else {
      signup(signupDetails);
    }
  };

  return (
    <>
      <Navigation />
      <div className={`${showLoading ? "blur" : ""} flex font-brandFont`}>
        <div className="w-1/2 flex items-center justify-center h-screen">
          <img
            src={SignupImage}
            alt="Login Image"
            className="object-cover h-full"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center rounded-l-xl bg-brand-primary p-10 space-y-4 h-screen">
          <div className="text-center">
            <h1 className="text-4xl text-white font-bold my-4">Signup</h1>
            <p className="text-md text-gray-100">
              You are one step away from getting started.
            </p>
          </div>

          <form onSubmit={formsubmitHandler} className="w-full space-y-2">
            <div className="flex flex-col w-full items-center space-y-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-white font-semibold">
                  Username
                </label>
                <div className="rounded-md bg-white flex items-center pr-4">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                    onChange={formChangeHandler}
                    value={signupDetails.username}
                  />
                  <FaUser className="text-brand-primary text-3xl" />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white font-semibold">
                  Email
                </label>
                <div className="rounded-md bg-white flex items-center pr-4">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                    onChange={formChangeHandler}
                    value={signupDetails.email}
                  />
                  <MdEmail className="text-brand-primary text-3xl" />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-white font-semibold">
                  Password
                </label>
                <div className="rounded-md bg-white flex items-center pr-4">
                  <input
                    type={signupDetails.passwordType}
                    name="password"
                    id="password"
                    className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                    onChange={formChangeHandler}
                    value={signupDetails.password}
                  />
                  {signupDetails.passwordType === "password" && (
                    <FaEye
                      className="text-brand-primary text-3xl cursor-pointer"
                      onClick={() => {
                        setSignupDetails((prev) => {
                          return {
                            ...prev,
                            passwordType: "text",
                          };
                        });
                      }}
                    />
                  )}
                  {signupDetails.passwordType === "text" && (
                    <FaEyeSlash
                      className="text-brand-primary text-3xl cursor-pointer"
                      onClick={() => {
                        setSignupDetails((prev) => {
                          return {
                            ...prev,
                            passwordType: "password",
                          };
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-white font-semibold"
                >
                  Confirm Password
                </label>
                <div className="rounded-md bg-white flex items-center pr-4">
                  <input
                    type="text"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                    onChange={formChangeHandler}
                    value={signupDetails.confirmPassword}
                  />
                  <RiLockPasswordFill className="text-brand-primary text-3xl" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-36">
                Signup
              </button>
            </div>

            <div className="flex items-center">
              <span className="bg-gray-100 w-full h-[2px]"></span>
              <p className="text-gray-100 w-full text-center">
                or continue with
              </p>
              <span className="bg-gray-100 w-full h-[2px]"></span>
            </div>

            <div className="flex items-center justify-center">
              <button className="btn-secondary flex flex-col items-center">
                <FaGoogle className="size-8" /> Sign Up with Google
              </button>
            </div>
          </form>

          <p className="text-white">
            Already have an account?{" "}
            <NavLink to="/auth/login/customer" className="underline">
              Sign In
            </NavLink>
          </p>
        </div>
      </div>

      {/* <Loader /> */}
      {showLoading && <Loader />}
    </>
  );
};

export default Signup;
