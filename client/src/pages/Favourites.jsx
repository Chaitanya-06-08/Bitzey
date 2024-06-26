import React, { useEffect, useState } from "react";
import { getState } from "../util/getState";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import FavouriteIcon from "../components/FavouriteIcon";
import { useNavigate } from "react-router-dom";
import {
  markRestaurantAsfavourite,
  removeRestaurantFromFavourite,
  markFoodItemAsfavourite,
  removeFoodItemFromFavourite,
} from "../util/requestToModifyFavourites";
import { useDispatch } from "react-redux";
import AddToCartButton from "../components/AddToCartButton";
import { cartActions } from "../store/Cart";
import { modalActions } from "../store/Modal";
import Modal from "../components/Modal";
const Favourites = () => {
  const user = getState("user");
  const showModal = getState("modal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState({
    favouriteRestaurants: [],
    favouriteFoodItems: [],
  });
  useEffect(() => {
    const getFavourites = async () => {
      try {
        let response = await axios.get(
          `/api/getFavouritesByCustomerid?_id=${user._id}`,
          { withCredentials: true }
        );
        // console.log(response.data);
        setFavourites({
          favouriteRestaurants: response.data.favouriteRestaurants,
          favouriteFoodItems: response.data.favouriteFoodItems,
        });
      } catch (error) {
        console.log(error);
        if (error.response.status == 403 || error.response.status == 401) {
          await requestAccessTokenRefresh(
            user,
            location,
            navigate,
            dispatch,
            `/auth/login/customer`
          );
        } else {
          toast.error(error?.response?.data?.message || error?.message);
        }
      }
    };
    if (user._id) getFavourites();
  }, [user]);
  return (
    <>
      <div className="flex flex-col space-y-4 p-4">
        <h1 className="underline text-4xl italic text-brand-primary font-bold">
          Favourite Food
        </h1>
        <div className="grid grid-cols-3 gap-2 p-2">
          {favourites.favouriteFoodItems.map((card, ind) => {
            return (
              <div
                className=" bg-white rounded-xl border-2 border-gray-200 shadow-lg p-3 cursor-pointer hover:bg-brand-primary hover:text-white hover:shadow-2xl transition-all space-y-2"
                key={ind}
              >
                <div className="w-full h-52 hover:rounded-xl transition-all relative">
                  <img
                    src={card.imageUrl}
                    alt=""
                    className=" w-full h-full object-cover rounded-lg"
                  />
                  <FavouriteIcon
                    onAddToFavouriteClicked={(_id) => {
                      markFoodItemAsfavourite(_id, dispatch, user, navigate);
                    }}
                    onRemoveFromFavouriteClicked={(_id) => {
                      removeFoodItemFromFavourite(
                        _id,
                        dispatch,
                        user,
                        navigate
                      );
                    }}
                    _id={card._id}
                    favouriteArray={favourites.favouriteFoodItems.map(
                      (fooditem) => fooditem._id
                    )}
                    pos={"right-4 top-4"}
                  />
                  <AddToCartButton item={card} />
                </div>
                <div className="flex items-center justify-between my-1 px-1">
                  <p className="text-2xl font-semibold">{card.name}</p>
                  <div className="rounded-lg bg-green-500 text-white px-2 py-1 flex items-center space-x-1 font-bold">
                    <span>&#8377;{card.price}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between my-1 px-1">
                  <p className="font-light text-ellipsis overflow-hidden max-w-48">
                    {card.category}
                  </p>
                  <span className="font-semibold">
                    Serves For : {card.servesfor}
                  </span>
                </div>
              </div>
            );
          })}
          {favourites.favouriteFoodItems.length == 0 && (
            <h1 className="text-xl text-brand-shade text-center font-bold bg-gray-100 p-2 rounded-xl w-full">
              No Favourite FoodItems found...
            </h1>
          )}
        </div>
        <h1 className="underline text-4xl italic text-brand-primary font-bold">
          Favourite Restaurants
        </h1>
        <div className="grid grid-cols-3 gap-2 p-2">
          {favourites.favouriteRestaurants.map((card, ind) => {
            return (
              <div
                className=" bg-white rounded-xl border-2 border-gray-200 shadow-lg p-3 cursor-pointer hover:bg-brand-primary hover:text-white hover:shadow-2xl transition-all space-y-2"
                key={ind}
                onClick={() => {
                  navigate(`/restaurantPage/${card._id}/menu`);
                }}
              >
                <div className="w-full h-52 hover:border-4 hover:border-brand-third hover:rounded-xl transition-all relative">
                  <img
                    src={card.image.imageUrl}
                    alt=""
                    className=" w-full h-full object-cover rounded-lg"
                  />
                  <FavouriteIcon
                    onAddToFavouriteClicked={(_id) => {
                      markRestaurantAsfavourite(_id, dispatch, user, navigate);
                    }}
                    onRemoveFromFavouriteClicked={(_id) => {
                      removeRestaurantFromFavourite(
                        _id,
                        dispatch,
                        user,
                        navigate
                      );
                    }}
                    _id={card._id}
                    favouriteArray={favourites.favouriteRestaurants.map(
                      (restaurant) => restaurant._id
                    )}
                    pos={"right-4 top-4"}
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
                    {card.cuisines.map((category, ind) => {
                      if (ind != card.cuisines.length - 1)
                        return (
                          <span className="mr-1" key={ind}>
                            {category},
                          </span>
                        );
                    })}
                    {
                      <span key={card.cuisines.length - 1}>
                        {card.cuisines[card.cuisines.length - 1]}
                      </span>
                    }
                  </p>
                  <span className="font-semibold">
                    {28 + Math.round(Math.random() * 20)} min
                  </span>
                </div>
              </div>
            );
          })}
          {favourites.favouriteRestaurants.length == 0 && (
            <h1 className="text-xl text-brand-shade text-center font-bold bg-gray-100 p-2 rounded-xl w-full">
              No Favourite restaurants found...
            </h1>
          )}
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

export default Favourites;
