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
import { modalActions } from "../store/Modal";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
const Restaurants = () => {
  const [Restaurants, setRestaurants] = useState([]);
  const [TempRestaurants, setTempRestaurants] = useState([]);
  const [filterBy, setFilterBy] = useState(0);
  const sortByOptions = ["Delivery Time", "Ratings"];
  const [filters, setFilters] = useState({
    sortBy: sortByOptions[0],
    cuisines: [],
  });
  const cuisines = [
    "American",
    "Chinese",
    "Hyderbadi",
    "Biryani",
    "North Indian",
    "South Indian",
    "Juices",
    "Beverages",
    "Kebab",
    "Pizza",
    "Fast Food",
    "Dessert",
    "korean",
  ];
  const navigate = useNavigate();
  const showSidebar = getState("sidebar");
  const user = getState("user");
  const showModal = getState("modal");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRestaurants = async () => {
      let response = await axios.get("/api/fetchRestaurants");
      let restaurants = response.data.restaurants;
      restaurants.forEach((restaurant) => {
        restaurant.deliveryTime = 28 + Math.round(Math.random() * 20);
        restaurant.ratings = Math.round(4 + Math.random());
      });
      setRestaurants(restaurants);
      setTempRestaurants(restaurants);
      // console.log(restaurants);
    };
    fetchRestaurants();
  }, []);

  const filterChangeHandler = (e) => {
    setFilters((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onApplyFilters = () => {
    let filteredRestaurants = [...TempRestaurants];
    filteredRestaurants.sort((a, b) => {
      if (filters.sortBy == sortByOptions[0])
        return a.deliveryTime - b.deliveryTime;
      else if (filters.sortBy == sortByOptions[1]) return b.ratings - a.ratings;
    });
    // console.log(filteredRestaurants);
    if (filters.cuisines.length > 0) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => {
        return filters.cuisines.some((cuisine) =>
          restaurant.cuisines.includes(cuisine)
        );
      });
    }
    console.log(filteredRestaurants);
    setTempRestaurants(filteredRestaurants);
    dispatch(modalActions.toggleModal(""));
    toast.success("Filtered Applied");
  };
  const onClearFitlers = () => {
    setFilters({
      sortBy: sortByOptions[0],
      cuisines: [],
    });
    setTempRestaurants(Restaurants);
  };
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
        } flex flex-col space-y-4 p-3 font-brandFont mx-auto`}
      >
        <div className="flex items-center justify-between border-b-2 border-b-gray-300 py-2">
          <h1 className="bg-white text-3xl text-brand-primary italic font-semibold">
            Restaurants
          </h1>
          <button
            className="btn-primary font-bold"
            onClick={() => {
              dispatch(modalActions.toggleModal("showFilters"));
            }}
          >
            Filters
          </button>
        </div>
        {TempRestaurants?.length > 0 &&
          TempRestaurants.map((card, ind) => {
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
                          <span>{card.deliveryTime} min</span>
                        </div>
                        <div className="rounded-lg bg-green-500 text-white px-2 py-1 flex items-center space-x-1 w-fit">
                          <span>{card.ratings}</span>
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
        {TempRestaurants.length == 0 && (
          <h1 className="text-3xl text-gray-400 font-semibold">
            Oops......No restaurants found
          </h1>
        )}
        {showModal === "showFilters" && (
          <Modal modalWidth="w-1/2">
            <h1 className="text-xl text-brand-third border-b-2 border-b-brand-third">
              Filters
            </h1>
            <div className="flex space-x-2 p-2 h-96 mb-2">
              <ul className="flex flex-col space-y-2 border-r-2 border-brand-third p-2 w-1/4 h-full">
                <li
                  className="text-start p-2 hover:rounded-xl hover:bg-brand-third hover:text-brand-primary cursor-pointer"
                  onClick={() => {
                    setFilterBy(0);
                  }}
                >
                  Sort By
                </li>
                <li
                  className="text-start p-2 hover:rounded-xl hover:bg-brand-third hover:text-brand-primary cursor-pointer"
                  onClick={() => {
                    setFilterBy(1);
                  }}
                >
                  Cuisines
                </li>
              </ul>
              <div className="w-3/4 py-4">
                {filterBy == 0 && (
                  <ul className="w-full">
                    {sortByOptions.map((option, ind) => {
                      return (
                        <li className="flex items-center mb-4" key={ind}>
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center space-x-3">
                            <input
                              id="sortBy"
                              type="radio"
                              name="sortBy"
                              value={option}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none"
                              onChange={filterChangeHandler}
                            />
                            <span className="text-xl">{option}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {filterBy == 1 && (
                  <ul className="w-full overflow-y-scroll max-h-96">
                    {cuisines.map((cuisine, ind) => {
                      return (
                        <label
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center space-x-3"
                          key={ind}
                        >
                          <input
                            type="checkbox"
                            name="cuisines"
                            id="cuisines"
                            checked={filters.cuisines.includes(cuisine)}
                            value={cuisine}
                            onChange={(e) => {
                              if (filters.cuisines.includes(e.target.value)) {
                                setFilters((prev) => {
                                  return {
                                    ...prev,
                                    [prev.cuisines]: prev.cuisines.filter(
                                      (prevCuisine) =>
                                        prevCuisine != e.target.value
                                    ),
                                  };
                                });
                              } else {
                                setFilters((prev) => {
                                  return {
                                    ...prev,
                                    [e.target.name]: [
                                      ...prev.cuisines,
                                      e.target.value,
                                    ],
                                  };
                                });
                              }
                            }}
                          />
                          <span className="text-xl">{cuisine}</span>
                        </label>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button className="btn-secondary" onClick={onClearFitlers}>
                Clear Filters
              </button>
              <button className="btn-primary" onClick={onApplyFilters}>
                Apply Filters
              </button>
            </div>
          </Modal>
        )}
      </motion.div>
    </>
  );
};

export default Restaurants;
