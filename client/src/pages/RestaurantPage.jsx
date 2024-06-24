import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingActions } from "../store/Loading";
import {
  markRestaurantAsfavourite,
  removeRestaurantFromFavourite,
} from "../util/requestToModifyFavourites";

import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { getState } from "../util/getState";
import Loader from "../components/Loader";
import Hamburger from "../components/Hamburger";
const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const dispatch = useDispatch();
  const location=useLocation()
  const showLoading = getState("loading");
  const showSidebar = getState("sidebar");
  const user = getState("user");
  let { _id } = useParams();
  if(!_id){
    _id=location.state?.restaurant_id
  }
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        let response = await axios.get(`/api/getRestauarntById?_id=${_id}`);
        console.log(response.data.restaurant);
        let restaurant = response.data.restaurant;
        let opentime_edit = new Date(restaurant.opentime);
        let closetime_edit = new Date(restaurant.closetime);
        restaurant.opentime = {
          openhour: opentime_edit.getHours().toString().padStart(2, "0"),
          openminute: opentime_edit.getMinutes().toString().padStart(2, "0"),
        };
        restaurant.closetime = {
          closehour: closetime_edit.getHours().toString().padStart(2, "0"),
          closeminute: closetime_edit.getMinutes().toString().padStart(2, "0"),
        };
        if (new Date() >= opentime_edit && new Date() <= closetime_edit)
          restaurant["isOpen"] = true;
        setRestaurant(restaurant);
      } catch (error) {
        console.log(error);
        toast(error?.response?.data?.message || error.message);
      }
    };
    dispatch(loadingActions.toggleLoading());
    getRestaurant();
    dispatch(loadingActions.toggleLoading());
  }, []);

  const isFavourite = (_id) => {
    return user?.favouriteRestaurants?.includes(_id);
  };

  return (
    <>
      {showLoading && <Loader />}
      {!showLoading && (
        <>
          <Hamburger />
          <div
            className={`${
              !showSidebar ? "max-w-[83.3333333%]" : ""
            } flex flex-col font-brandFont px-4 py-6 space-y-3 mx-auto max-w-[90%]`}
          >
            <div className="flex space-x-20 h-2/3 px-6 py-10 border-2 border-gray-300 shadow-lg rounded-2xl">
              <div className="w-[28rem] h-full ml-2">
                <img
                  src={restaurant?.image?.imageUrl}
                  alt=""
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="w-1/2 h-36 flex flex-col space-y-6 py-2">
                <div className="w-full flex flex-col justify-start space-y-3">
                  <h1 className="italic text-4xl underline text-brand-primary font-semibold">
                    {restaurant?.name}
                  </h1>
                  <p className="flex items-center space-x-2 w-full text-xl">
                    <MdLocationOn />
                    {restaurant?.location.city}, {restaurant?.location.state}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-gray-400 font-semibold underline">
                    Cuisines Served:
                  </p>
                  <ul>
                    {restaurant?.cuisines.map((cuisine, ind) => {
                      return (
                        <span className=" text-lg text-gray-400" key={ind}>
                          {cuisine}
                          {ind != restaurant.cuisines.length - 1 ? ",  " : ""}
                        </span>
                      );
                    })}
                  </ul>
                </div>
                <p
                  className={`${
                    restaurant?.isOpen ? "text-green-500" : "text-red-500"
                  } text-lg font-bold space-x-2`}
                >
                  <span>
                    {restaurant?.isOpen ? "Open Now" : "Closed Now"} -{" "}
                  </span>
                  <span>
                    {restaurant?.opentime.openhour} :
                    {restaurant?.opentime.openminute} -
                  </span>
                  <span>
                    {restaurant?.closetime.closehour} :
                    {restaurant?.closetime.closeminute}
                  </span>
                </p>
                <div className="flex space-x-2 text-lg font-semibold">
                  <button className="btn-primary flex items-center group relative text-sm">
                    {!isFavourite(_id) && (
                      <span
                        className="flex items-center"
                        onClick={() => {
                          markRestaurantAsfavourite(_id, dispatch, user);
                        }}
                      >
                        <IoHeartOutline className="text-3xl" />
                        <p>Mark As Favourite</p>
                      </span>
                    )}
                    {isFavourite(_id) && (
                      <span
                        className="flex items-center"
                        onClick={() => {
                          removeRestaurantFromFavourite(_id, dispatch, user);
                        }}
                      >
                        <IoHeart className="text-3xl" />
                        <p>Remove From Favourites</p>
                      </span>
                    )}
                  </button>
                  <button className="btn-primary flex items-center">
                    <MdShare className="font-bold text-3xl" />
                    share
                  </button>
                  <div className="rounded-lg bg-green-500 text-white px-2 py-1 flex items-center space-x-1">
                    <span>{Math.round(4 + Math.random())}</span>
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
            <ul className="flex space-x-8 px-4 py-6 border-b-2 border-b-gray-400">
              <NavLink
                to="menu"
                className={({ isActive }) =>
                  isActive
                    ? "text-brand-primary border-b-4 border-b-brand-primary"
                    : ""
                }
              >
                Menu
              </NavLink>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive
                    ? "text-brand-primary border-b-4 border-b-brand-primary"
                    : ""
                }
              >
                Reviews
              </NavLink>
            </ul>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default RestaurantPage;
