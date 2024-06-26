import React from "react";
import { FaCircle } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getState } from "../util/getState";
import FavouriteIcon from "../components/FavouriteIcon";
import {
  markFoodItemAsfavourite,
  removeFoodItemFromFavourite,
} from "../util/requestToModifyFavourites";
import AddToCartButton from "../components/AddToCartButton";
import { useNavigate } from "react-router-dom";
const RestaurantMenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const user = getState("user");
  const navigate = useNavigate();
  return (
    <>
      <div className="flex py-6 px-12 w-full border-b-2 border-b-gray-200">
        <div className="w-3/4 flex flex-col space-y-2 mr-2">
          <div className="flex space-x-4 items-center">
            {item.type == "veg" && (
              <FaCircle className="text-green-500 p-2 rounded-xl border-2 border-green-500 font-bold w-fit text-4xl" />
            )}
            {item.type == "non-veg" && (
              <BsFillTriangleFill className="text-red-500 rounded-xl border-2 border-red-500 font-bold w-fit text-4xl p-2" />
            )}
            <p className="text-xl font-semibold">{item.name}</p>
            <p className="text-xl">&#8377;{item.price}</p>
          </div>
          <p className="space-x-2">
            <span className="underline">Serves For : </span>
            <span>{item.servesfor}</span>
          </p>
          <div className="italic">{item.description}</div>
        </div>
        <div className="w-1/4 h-44 shadow-xl rounded-2xl relative">
          <img
            src={item.imageUrl}
            alt="item img"
            className="object-contain w-full h-full rounded-2xl"
          />
          <FavouriteIcon
            onAddToFavouriteClicked={(_id) => {
              markFoodItemAsfavourite(_id, dispatch, user, navigate);
            }}
            onRemoveFromFavouriteClicked={(_id) => {
              removeFoodItemFromFavourite(_id, dispatch, user, navigate);
            }}
            favouriteArray={user.favouriteFoodItems}
            _id={item._id}
            pos={"top-4 right-4"}
            className={"hover:scale-110"}
          />
          <AddToCartButton item={item} />
        </div>
      </div>
    </>
  );
};

export default RestaurantMenuItem;
