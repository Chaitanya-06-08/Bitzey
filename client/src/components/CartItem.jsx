import React from "react";
import { getState } from "../util/getState";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/Cart";
const CartItem = ({ item,getCart }) => {
  const cart=getState('cart')
  const dispatch=useDispatch()
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
    <div className="rounded-xl border-2 border-gray-400 w-full flex justify-between space-x-2 bg-brand-primary text-white transition-all p-2">
      <div className="w-48 h-36 rounded-xl">
        <img
          src={item.imageUrl}
          alt="item img"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center justify-around">
        <p className="flex flex-col items-center">
          <span className="font-semibold ">{item.name}</span>
          <span className="font-light">&#40;{item.category}&#41;</span>
        </p>
        <p className="font-light">&#8377;{item.price}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-brand-third rounded-xl text-brand-primary flex text-lg font-bold border-brand-shade border-2 w-28">
          <button
            className="text-xl w-1/3 hover:bg-background-shade hover:rounded-l-xl"
            onClick={() => {
              dispatch(cartActions.removeFromCart(item))
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
      </div>
    </div>
  );
};

export default CartItem;
