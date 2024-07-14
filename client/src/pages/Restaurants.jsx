import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getState } from "../util/getState";
import {
  markRestaurantAsfavourite,
  removeRestaurantFromFavourite,
} from "../util/requestToModifyFavourites";
import { MdAccessTimeFilled } from "react-icons/md";
import axios from "../util/axios";
import { useDispatch } from "react-redux";
import FavouriteIcon from "../components/FavouriteIcon";
const Restaurants = () => {
  const [Restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const showSidebar = getState("sidebar");
  const user = getState("user");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRestaurants = async () => {
      let response = await axios.get("/api/fetchRestaurants");
      setRestaurants(response.data.restaurants);
      // console.log(response);
    };
    fetchRestaurants();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            type: "tween",
            duration: 0.8,
          },
        }}
        // className="m-4 grid grid-cols-3 gap-8 font-brandFont"
        className={`${
          showSidebar ? "max-w-[90%]" : "max-w-[70%]"
        } flex flex-col space-y-4 p-3 font-brandFont mx-auto `}
      >
        <h1 className="bg-white text-3xl text-brand-primary italic border-b-2 border-b-gray-300 font-semibold">
          Restaurants
        </h1>
        {Restaurants?.length > 0 &&
          Restaurants.map((card, ind) => {
            return (
              <div
                onClick={() => {
                  navigate(`/restaurantPage/${card._id}/menu`);
                }}
                key={ind}
              >
                {/* <div className=" bg-white rounded-xl border-2 border-slate-200 p-3 cursor-pointer hover:bg-brand-primary hover:text-white hover:shadow-2xl transition-all space-y-2">
                <div className="w-full h-72 hover:border-4 hover:border-brand-third hover:rounded-xl transition-all">
                  <img
                    src={card.imageUrl}
                    alt=""
                    className=" w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between my-1 px-1">
                  <p className="text-2xl font-semibold">{card.name}</p>
                  <div className="rounded-lg bg-green-500 text-white px-2 py-1 flex items-center space-x-1">
                    <span>{Math.round(4 + Math.random())}</span>
                    <FaStar />
                  </div>
                </div>
                <div className="flex items-center justify-between my-1 px-1">
                  <p className="font-light text-ellipsis overflow-hidden max-w-48">
                    {card.cusinies.map((category, ind) => {
                      if (ind != card.cusinies.length - 1)
                        return <span className="mr-1">{category},</span>;
                    })}
                    {<span>{card.cusinies[card.cusinies.length - 1]}</span>}
                  </p>
                  <span className="font-semibold">
                    {28 + Math.round(Math.random() * 20)} min
                  </span>
                </div>
              </div> */}

                <div className="flex space-x-8 rounded-xl border-2 border-gray-200 m-2 py-3 px-4 shadow-2xl hover:bg-brand-primary hover:text-white transition-all group w-full cursor-pointer">
                  <div className="flex flex-col space-y-2 py-4 w-3/5 pl-16">
                    <h1 className="text-3xl font-bold underline text-brand-primary group-hover:text-brand-third">
                      {card.name}
                    </h1>
                    <div className="flex space-x-2">
                      <ul className="w-3/4 grid grid-cols-2 p-2">
                        {card.cuisines.map((cusinie, ind) => {
                          return (
                            <p
                              key={ind}
                              className="flex space-x-1 items-center"
                            >
                              <span className="size-2 bg-black group-hover:bg-brand-third rounded-full"></span>
                              <span className="font-medium">{cusinie}</span>
                            </p>
                          );
                        })}
                      </ul>
                      <div className="flex flex-col space-y-6 p-2 w-1/4">
                        <div className="text-green-400 flex items-center space-x-2 font-bold text-xl">
                          <MdAccessTimeFilled className="font-bold text-2xl" />
                          <span>{28 + Math.round(Math.random() * 20)} min</span>
                        </div>
                        <div className="rounded-lg bg-green-500 text-white px-2 py-1 flex items-center space-x-1 w-fit">
                          <span>{Math.round(4 + Math.random())}</span>
                          <FaStar />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5 h-64 scale-90 relative">
                    <img
                      src={card.image.imageUrl}
                      alt="restaurant image"
                      className="rounded-2xl object-cover w-full h-full  group-hover:border-4 group-hover:border-brand-third transition-all"
                    />
                    <FavouriteIcon
                      onAddToFavouriteClicked={(_id) => {
                        markRestaurantAsfavourite(
                          _id,
                          dispatch,
                          user,
                          navigate
                        );
                      }}
                      onRemoveFromFavouriteClicked={(_id) => {
                        removeRestaurantFromFavourite(
                          _id,
                          dispatch,
                          user,
                          navigate
                        );
                      }}
                      favouriteArray={user.favouriteRestaurants}
                      _id={card._id}
                      pos={"top-4 right-4"}
                      className={"hover:scale-110"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        {Restaurants.length == 0 && (
          <h1 className="text-3xl text-gray-400 font-semibold">
            Oops......No restaurants found
          </h1>
        )}
      </motion.div>
    </>
  );
};

export default Restaurants;
