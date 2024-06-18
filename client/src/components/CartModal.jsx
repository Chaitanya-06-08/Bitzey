import React, { forwardRef } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdOutlineClearAll } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import CartItem from "./CartItem";
import { getState } from "../util/getState";
import emptyCart from "../assets/empty-cart.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/Cart";
const CartModal = forwardRef((props, ref) => {
  const cart = getState("cart");
  const dispatch = useDispatch();
  const clearCart = () => {
    dispatch(cartActions.clearCart());
  };
  return (
    <dialog
      ref={ref}
      className="mx-auto w-1/2 my-0 h-full rounded-xl focus:outline-none backdrop:bg-[rgba(0,0,0,0.60)] bg-gray-100"
    >
      <div className="flex items-center justify-between py-4 px-4 text-4xl shadow-xl">
        <IoArrowBackCircle
          className="cursor-pointer"
          onClick={() => {
            ref.current.close();
          }}
        />
        <BsCart4 />
        <span
          className="flex space-x-1 text-xl items-center border-2 border-gray-300 p-1 rounded-xl cursor-pointer hover:shadow-2xl active:scale-75 transition-all"
          onClick={clearCart}
        >
          <MdOutlineClearAll />
          Clear
        </span>
      </div>
      <div className="flex flex-col space-y-3 p-6">
        {cart?.items.length > 0 &&
          cart?.items?.map((cartitem, ind) => {
            let item = cartitem.item;
            return <CartItem item={item} key={ind} />;
          })}
        {cart?.items.length == 0 && (
          <div className="w-full h-full flex flex-col space-y-2 items-center justify-center">
            <img src={emptyCart} alt="empty cart img" className="w-1/2 h-1/2" />
            <p className="text-xl text-brand-primary">
              Hey there, lets get you some food
            </p>
            <NavLink
              to="/restaurants"
              className="btn-primary"
              onClick={() => {
                ref.current.close();
              }}
            >
              Browse Food
            </NavLink>
          </div>
        )}
      </div>
    </dialog>
  );
});

export default CartModal;
