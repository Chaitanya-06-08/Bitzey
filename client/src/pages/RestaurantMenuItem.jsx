import React from "react";
import { FaCircle } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";
import {useDispatch} from "react-redux"
import {getState} from "../util/getState"
import { cartActions } from "../store/Cart";
const RestaurantMenuItem = ({ item }) => {
  const dispatch=useDispatch()
  const cart=getState('cart')
  const checkIfItemIsPresent = (item) => {
    if (!cart || cart?.items.length == 0) return -1;
    let index = cart.items.findIndex(
      (cartitem) => cartitem.item._id == item._id
    );
    return index;
  };
  const getQuantity = (item) => {
    let index = checkIfItemIsPresent(item);
    if (index == -1) return 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart.items[index].quantity;
  };

  return (
    <div className="flex py-6 px-12 w-full border-b-2 border-b-gray-200">
      <div className="w-3/4 flex flex-col space-y-2">
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
        <p>
          Serves For : <span>{item.servesfor}</span>
        </p>
        <div className="">{item.description}</div>
      </div>
      <div className="w-1/4 h-44 shadow-xl rounded-2xl relative">
        <img
          src={item.imageUrl}
          alt="item img"
          className="object-cover w-full h-full rounded-2xl"
        />
        {checkIfItemIsPresent(item) != -1 && (
          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-brand-third rounded-xl text-brand-primary flex text-lg font-bold border-brand-shade border-2 w-28">
            <button
              className="text-xl w-1/3 hover:bg-background-shade hover:rounded-l-xl"
              onClick={() => {
                dispatch(cartActions.removeFromCart(item));
              }}
            >
              -
            </button>
            <span className="w-1/3 text-center">{getQuantity(item)}</span>
            <button
              className="text-xl w-1/3 hover:bg-background-shade hover:rounded-r-xl"
              onClick={() => {
                dispatch(cartActions.addToCart(item))
              }}
              >
              +
            </button>
          </div>
        )}
        {checkIfItemIsPresent(item) == -1 && (
          <button
          className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[-50%] btn-primary font-bold"
          onClick={() => {
            dispatch(cartActions.addToCart(item))
            }}
          >
            Add +
          </button>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuItem;
