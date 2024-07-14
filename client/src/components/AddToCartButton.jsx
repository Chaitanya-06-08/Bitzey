import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/Cart";
import { getState } from "../util/getState";
import { modalActions } from "../store/Modal";
import useModalData from "../hooks/useModalData";
const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const cart = getState("cart");
  const { setModalData } = useModalData();
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
    <>
      {checkIfItemIsPresent(item) != -1 && (
        <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-brand-third rounded-xl text-brand-primary flex text-lg font-bold border-brand-shade border-2 w-28">
          <button
            className="text-xl w-1/3 hover:bg-background-shade hover:rounded-l-xl"
            onClick={() => {
              dispatch(cartActions.reduceQuantity(item));
            }}
          >
            -
          </button>
          <span className="w-1/3 text-center">{getQuantity(item)}</span>
          <button
            className="text-xl w-1/3 hover:bg-background-shade hover:rounded-r-xl"
            onClick={() => {
              dispatch(cartActions.addToCart(item));
            }}
          >
            +
          </button>
        </div>
      )}
      {checkIfItemIsPresent(item) == -1 && (
        <button
          className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[-50%] btn-addToCart"
          onClick={() => {
            if (
              cart.items.length > 0 &&
              cart.items[0].item.restaurant_id != item.restaurant_id
            ) {
              setModalData(item);
              dispatch(modalActions.toggleModal("itemsInCart"));
            } else dispatch(cartActions.addToCart(item));
          }}
        >
          Add +
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
