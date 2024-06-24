import React from "react";
import { FaCircle } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getState } from "../util/getState";
import { cartActions } from "../store/Cart";
import Modal from "../components/Modal";
import { modalActions } from "../store/Modal";
import FavouriteIcon from "../components/FavouriteIcon";
import {
  markFoodItemAsfavourite,
  removeFoodItemFromFavourite,
} from "../util/requestToModifyFavourites";
import AddToCartButton from "../components/AddToCartButton";
const RestaurantMenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const showModal = getState("modal");
  const user = getState("user");

 
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
              markFoodItemAsfavourite(_id, dispatch, user);
            }}
            onRemoveFromFavouriteClicked={(_id) => {
              removeFoodItemFromFavourite(_id, dispatch, user);
            }}
            favouriteArray={user.favouriteFoodItems}
            _id={item._id}
            pos={"top-4 right-4"}
            className={"hover:scale-110"}
          />
          <AddToCartButton item={item}/>
        </div>
      </div>
      {showModal == "itemsInCart" && (
        <Modal modalWidth="w-1/3">
          <div className="flex flex-col space-y-2 ">
            <h1 className="text-3xl font-bold">Items already in cart</h1>
            <p>
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </p>
            <div className="flex space-x-2 items-center justify-end">
              <button
                className="btn-secondary"
                onClick={() => {
                  dispatch(modalActions.toggleModal(""));
                }}
              >
                No
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  dispatch(cartActions.clearCart());
                  dispatch(cartActions.addToCart(item));
                  dispatch(modalActions.toggleModal(""));
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RestaurantMenuItem;
