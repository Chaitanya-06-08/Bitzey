import React from "react";
import logo from "../assets/delivery.png";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { sidebarActions } from "../store/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { getState } from "../util/getState";
import Tooltip from "./Tooltip";
import { loadingActions } from "../store/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { userActions } from "../store/User";
import requestAccessTokenRefresh from "../util/requestAccessTokenRefresh";
import ProfileImage from "./ProfileImage";
const Sidebar = () => {
  let user = getState("user");
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  let loginType = location.pathname.split("/")[1];
  const logoutHandler = async () => {
    dispatch(loadingActions.toggleLoading());
    try {
      const response = await axios.post(
        "/api/logout",
        {
          ...user,
        },
        { withCredentials: true }
      );
      // console.log("Logout :\n");
      // console.log(response.data);
      if (response.status == 200) {
        toast.success(response.data.message);
        dispatch(
          userActions.setUser({
            username: "",
            email: "",
            image: { imageUrl: "", public_id: "" },
            accessToken: "",
            refreshToken: "",
            usertype: "",
            isLoggedIn: false,
          })
        );
        localStorage.removeItem("email");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 403||error.response.status == 401) {
        await requestAccessTokenRefresh(
          user,
          location,
          navigate,
          dispatch,
          `/auth/login/${user.usertype}`
        );
      } else {
        toast.error(error?.response?.data?.message || error?.message);
      }
    }

    dispatch(loadingActions.toggleLoading());
  };
  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{
          x: 0,
          transition: {
            duration: 0.4,
          },
        }}
        className=" h-screen w-1/5 px-7 bg-brand-primary font-brandFont z-40 relative rounded-r-2xl"
      >
        <IoIosCloseCircle
          onClick={() => {
            dispatch(sidebarActions.toggleSideBar());
          }}
          className=" absolute text-brand-third right-2 top-2 text-4xl cursor-pointer"
        />
        {/* Logo and name */}
        <div className="ml-3 flex items-center">
          <img src={logo} alt="App Logo" className="w-20 h-20 mt-5 " />
          <h1
            className="w-full h-full ml-10 mt-10 text-slate-50 text-4xl font-bold italic animate-bounce
          "
          >
            Bitzey
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center py-10 text-white w-full">
          {/* Profile icon */}
          <div className="relative w-2/3 h-36 flex items-center justify-center rounded-full">
            <ProfileImage />
          </div>
          {user.isLoggedIn && (
            <>
              <div className="mt-2 text-xl">Welcome</div>
              <div className="text-3xl font-bold">{user.username}</div>
            </>
          )}
          {!user.isLoggedIn && (
            <div className="flex my-3 space-x-2 py-2">
              <NavLink to="/auth/">
                <button className="btn-secondary">Sign In</button>
              </NavLink>
              <NavLink to="/auth/">
                <button className="btn-primary">Sign Up</button>
              </NavLink>
            </div>
          )}

          {/* List items */}
          <ul className=" list-none flex flex-col space-y-1 my-3 text-xl w-full">
            {user.usertype == "restaurant" || loginType == "restaurant" ? (
              <>
                <NavLink
                  to="dashboard"
                  className={({ isActive }) => {
                    return (
                      (isActive
                        ? `bg-white text-brand-primary rounded-3xl `
                        : ``) +
                      (user.isLoggedIn
                        ? "cursor-pointer"
                        : "cursor-not-allowed")
                    );
                  }}
                >
                  <Tooltip
                    tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                    pos="right-[-32%]"
                    className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex items-center justify-center"
                  >
                    <IoGrid className="text-3xl w-1/3" />
                    <p className="w-2/3">Dashboard</p>
                  </Tooltip>
                </NavLink>
                <NavLink
                  to="orders"
                  className={({ isActive }) => {
                    return (
                      (isActive
                        ? `bg-white text-brand-primary rounded-3xl `
                        : ``) +
                      (user.isLoggedIn
                        ? "cursor-pointer"
                        : "cursor-not-allowed")
                    );
                  }}
                >
                  <Tooltip
                    tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                    pos="right-[-32%]"
                    className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex items-center justify-center"
                  >
                    <GiCardboardBoxClosed className="text-3xl w-1/3" />
                    <p className="w-2/3">Orders</p>
                  </Tooltip>
                </NavLink>
                <NavLink
                  to="menu"
                  className={({ isActive }) => {
                    return (
                      (isActive
                        ? `bg-white text-brand-primary rounded-3xl `
                        : ``) +
                      (user.isLoggedIn
                        ? "cursor-pointer"
                        : "cursor-not-allowed")
                    );
                  }}
                >
                  <Tooltip
                    tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                    pos="right-[-32%]"
                    className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex items-center justify-center"
                  >
                    <MdOutlineMenuBook className="text-3xl w-1/3" />
                    <p className="w-2/3">Menu</p>
                  </Tooltip>
                </NavLink>
                <NavLink
                  to="addmenuitem"
                  className={({ isActive }) => {
                    return (
                      (isActive
                        ? `bg-white text-brand-primary rounded-3xl `
                        : ``) +
                      (user.isLoggedIn
                        ? "cursor-pointer"
                        : "cursor-not-allowed")
                    );
                  }}
                >
                  <Tooltip
                    tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                    pos="right-[-32%]"
                    className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex items-center justify-center"
                  >
                    <MdOutlinePostAdd className="text-3xl w-1/3" />
                    <p className="w-2/3">Add Item</p>
                  </Tooltip>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="#"
                  className={`${
                    user.isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <Tooltip
                    tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                    pos="right-[-32%]"
                    className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex"
                  >
                    <FaUserCircle className="text-3xl w-1/3" />
                    <p className="w-2/3">Profile</p>
                  </Tooltip>
                </NavLink>
                <NavLink
                  to="orders"
                  className={`${
                    user.isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <Tooltip
                    tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                    pos="right-[-32%]"
                    className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex items-center justify-center"
                  >
                    <GiCardboardBoxClosed className="text-3xl w-1/3" />
                    <p className="w-2/3">My Orders</p>
                  </Tooltip>
                </NavLink>
                <NavLink
                  to="favourites"
                  className={`${
                    user.isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <Tooltip
                    tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                    pos="right-[-32%]"
                    className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex items-center justify-center"
                  >
                    <FaStar className="text-3xl w-1/3" />
                    <p className="w-2/3">Favourites</p>
                  </Tooltip>
                </NavLink>
              </>
            )}
            {user.isLoggedIn && (
              <NavLink
                to="/"
                onClick={logoutHandler}
                className={`${
                  user.isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <Tooltip
                  tooltip={`${user.isLoggedIn ? "" : "Login In Continue"}`}
                  pos="right-[-32%]"
                  className="hover:bg-white hover:text-brand-primary hover:rounded-3xl transition-all px-5 py-2 mx-1 flex items-center justify-center"
                >
                  <HiOutlineLogout className="text-3xl w-1/3" />
                  <p className="w-2/3">Logout</p>
                </Tooltip>
              </NavLink>
            )}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
