import React, { useState } from "react";
import LoginImage from "../../assets/My password.gif";
import { MdEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loadingActions } from "../../store/Loading";
import { restaurantActions } from "../../store/Restaurant";
import Loader from "../Loader";
import { userActions } from "../../store/User";
import { useNavigate } from "react-router-dom";
import { getState } from "../../util/getState";
import { useDispatch } from "react-redux";
import Navigation from "../Navigation";
const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    showPassword: false,
    passwordType: "password",
  });

  const showLoading = getState("loading");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { pathname } = useLocation();
  let loginType = pathname.split("/").pop();
  // console.log(loginType);
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let { email, password } = loginDetails;
    if (!(email && password)) {
      toast.error("Hey there, you left some fields empty", {
        duration: 5000,
      });
    } else {
      // console.log(loginDetails);
      dispatch(loadingActions.toggleLoading());
      try {
        let response = await axios.post(`/api/login/${loginType}`, {
          email: loginDetails.email,
          password: loginDetails.password,
          usertype: loginType,
        });
        // console.log("Login IN:\n");
        // console.log(response.data);
        if (response.status == 200) {
          toast.success(response.data.message);
          setLoginDetails({
            email: "",
            password: "",
            showPassword: false,
            passwordType: "password",
          });
          let {
            _id,
            username,
            email,
            imageUrl,
            accessToken,
            refreshToken,
            usertype,
            favouriteFoodItems,
            favouriteRestaurants
          } = response.data;
          dispatch(
            userActions.setUser({
              _id,
              username,
              email,
              imageUrl,
              usertype,
              isLoggedIn: true,
            })
          );
          localStorage.setItem("email", email);
          dispatch(userActions.setAccessToken(accessToken));
          dispatch(userActions.setRefreshToken(refreshToken));
          dispatch(userActions.setFavouriteFooditems(favouriteFoodItems))
          dispatch(userActions.setFavouriteRestaurants(favouriteRestaurants))

          if (loginType == "customer") {
            let backToLink = location.state?.from || "/";
            navigate(backToLink,{replace:true});
          } else {
            let { _id, user_id, name, imageUrl, location } =
              response.data.restaurantInfo;
            user_id = user_id._id;
            // console.log(user_id,name,imageUrl,location);
            dispatch(
              restaurantActions.setRestaurantInfo({
                restaurant_id: _id,
                user_id,
                name,
                imageUrl,
                location,
              })
            );
            let backToLink = location.state?.from || "/restaurant/";
            navigate(backToLink,{replace:true});
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message, {
          duration: 4000,
        });
      } finally {
        dispatch(loadingActions.toggleLoading());
      }
    }
  };

  const formChangeHandler = (e) => {
    setLoginDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
    <Navigation/>
      <div className={`${showLoading ? "blur" : ""} flex font-brandFont`}>
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={LoginImage}
            alt="Login Image"
            className="object-cover h-full"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center rounded-l-xl bg-brand-primary p-10 space-y-4 h-screen">
          <div className="text-center mt-4">
            <h1 className="text-4xl text-white font-bold my-4">
              {loginType} Sign In
            </h1>
            <p className="text-md text-gray-100">
              Welcome back, you are one step away from getting the best food
              ordering experience
            </p>
          </div>
          <form onSubmit={formSubmitHandler} className="w-full space-y-4">
            <div className="flex flex-col items-center space-y-4">
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
                    value={loginDetails.email}
                    onChange={formChangeHandler}
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
                    type={loginDetails.passwordType}
                    name="password"
                    id="password"
                    className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                    value={loginDetails.password}
                    onChange={formChangeHandler}
                  />
                  {!loginDetails.showPassword && (
                    <FaEye
                      className="text-brand-primary text-3xl cursor-pointer"
                      onClick={() => {
                        setLoginDetails((prev) => {
                          return {
                            ...prev,
                            showPassword: !loginDetails.showPassword,
                            passwordType: "text",
                          };
                        });
                      }}
                    />
                  )}
                  {loginDetails.showPassword && (
                    <FaEyeSlash
                      className="text-brand-primary text-3xl cursor-pointer"
                      onClick={() => {
                        setLoginDetails((prev) => {
                          return {
                            ...prev,
                            showPassword: !loginDetails.showPassword,
                            passwordType: "password",
                          };
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <button type="submit" className="btn-primary w-36">
                Sign In
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
                <FaGoogle className="size-8" /> Sign In with Google
              </button>
            </div>
          </form>

          <p className="text-white">
            Don't have an account?{" "}
            <NavLink to={`/auth/signup/${loginType}`} className="underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
      {showLoading && <Loader />}
    </>
  );
};

export default Login;
