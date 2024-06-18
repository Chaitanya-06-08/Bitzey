import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadingActions } from "../store/Loading";
import { getState } from "../util/getState";
import { FaChevronCircleDown } from "react-icons/fa";
import Loader from "../components/Loader";
import RestaurantMenuItem from "./RestaurantMenuItem";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState([]);
  const [showCategories, setShowCategories] = useState([0]);
  const dispatch = useDispatch();
  const showLoading = getState("loading");
  const location = useLocation();
  let paths = location.pathname.split("/");
  paths.pop();
  let _id = paths.pop();
  useEffect(() => {
    const getMenuByRestaurantId = async () => {
      try {
        const response = await axios.get(
          `/api/getMenuByRestaurantId?_id=${_id}`
        );
        console.log(response.data);
        setMenu(response.data.menuitems);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.message);
      }
    };
    dispatch(loadingActions.toggleLoading());
    getMenuByRestaurantId();
    dispatch(loadingActions.toggleLoading());
  }, []);

  const categoryToggle = (ind) => {
    setShowCategories((prev) => {
      let newShowCategories = [...prev];
      if (prev.includes(ind)) {
        newShowCategories = newShowCategories.filter(
          (currInd) => currInd != ind
        );
      } else {
        newShowCategories.push(ind);
      }
      return newShowCategories;
    });
  };

  return (
    <>
      {showLoading && <Loader />}
      {!showLoading && (
        <div className="flex flex-col space-y-3">
          {menu?.map((category, ind) => {
            return (
              <>
                <div className="flex flex-col space-y-2 w-full rounded-xl border-2 border-gray-400">
                  <div
                    className="p-4 font-bold text-xl flex justify-between w-full cursor-pointer"
                    onClick={() => {
                      categoryToggle(ind);
                    }}
                  >
                    <div className="space-x-1">
                      <span className="">{category._id}</span>
                      <span>&#40;{category.category_count}&#41;</span>
                    </div>
                    <FaChevronCircleDown
                      className={`${
                        showCategories.includes(ind) ? " rotate-180" : ""
                      } cursor-pointer text-3xl transition-all`}
                    />
                  </div>
                  <div
                    className={`${
                      showCategories.includes(ind) ? "" : "hidden"
                    } flex flex-col px-12 transition-all`}
                  >
                    {category.items.map((item) => {
                      return (
                        <>
                          <RestaurantMenuItem item={item} />
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RestaurantMenu;
