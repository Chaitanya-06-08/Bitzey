import React, { useState } from "react";
import { getState } from "../util/getState";
import axios from "../util/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingActions } from "../store/Loading";
import { modalActions } from "../store/Modal";
import toast from "react-hot-toast";
import Logo from "../assets/delivery.png";
import { baseURL } from "../util/axios";
const ConfirmOrder = () => {
  const user = getState("user");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = getState("cart");
  const [ConfirmOrderDetails, setConfirmOrderDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
  });
  const formChangeHandler = (e) => {
    setConfirmOrderDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const checkForEmpty = (arr) => {
    return arr.some((field) => {
      if (typeof field === "string") {
        return !field.trim();
      } else if (typeof field === "number") {
        return field === 0;
      } else {
        return !field;
      }
    });
  };
  const checkout = async (amount) => {
    const {
      data: { key },
    } = await axios.get("/api/getPaymentAPIKey", { withCredentials: true });
    console.log(key);
    const {
      data: { order },
    } = await axios.post(
      "/api/createPaymentOrder",
      {
        amount,
        currency: "INR",
      },
      { withCredentials: true }
    );
    console.log(order.id);
    var options = {
      key: key,
      amount: Math.round(Number(amount)) * 100,
      currency: "INR",
      name: "Bitzey",
      description: "Order Checkout",
      image: Logo,
      order_id: order.id,
      callback_url: `${baseURL}/api/paymentVerification`,
      prefill: {
        name: user.username,
        email: user.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FD2E2E",
      },
    };
    var razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  const placeOrder = async () => {
    let { name, address, city, state } = ConfirmOrderDetails;

    if (checkForEmpty([name, address, city, state])) {
      toast.error("Hey there, you left out some fields to fill");
      return;
    }
    dispatch(modalActions.toggleModal(""));
    let { items, totalPrice } = cart;
    items = items.map((cartitem) => {
      return {
        item_id: cartitem.item._id,
        quantity: cartitem.quantity,
      };
    });
    dispatch(loadingActions.toggleLoading());
    try {
      if (cart.totalQuantity < 3) totalPrice += 20;
      const order = {
        user_email: user.email,
        customerName: ConfirmOrderDetails.name,
        restaurant_id: cart.items[0].item.restaurant_id,
        items,
        totalPrice,
        deliveryLocation: {
          address,
          city,
          state,
        },
        deliveryStatus: "pending",
        paymentStatus: "success",
      };
      localStorage.setItem("order", JSON.stringify(order));
      // console.log(localStorage.getItem("order"));
      await checkout(totalPrice);
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        await requestAccessTokenRefresh(
          user,
          location,
          navigate,
          dispatch,
          `/auth/login/${user.usertype}`
        );
      } else {
        toast.error(error?.response?.data?.message || error?.message);
      }
    } finally {
      dispatch(loadingActions.toggleLoading());
    }
  };
  return (
    <div className="flex flex-col items-center p-2 space-y-4">
      <h1 className="text-3xl">Order Confirmation</h1>
      <div className="flex flex-col space-y-2 w-full">
        <h1 className="text-xl">Delivery Details:</h1>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-white font-semibold">
            Email:
          </label>
          <div className="rounded-md bg-white flex items-center ">
            <input
              type="email"
              name="email"
              id="email"
              disabled
              className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none cursor-not-allowed"
              value={user.email}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-white font-semibold">
            Name:
          </label>
          <div className="rounded-md bg-white flex items-center ">
            <input
              type="text"
              name="name"
              id="name"
              className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
              value={ConfirmOrderDetails.name}
              onChange={formChangeHandler}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <label htmlFor="address" className="text-white font-semibold">
              Address:
            </label>
            <div className="rounded-md bg-white flex items-center ">
              <input
                type="text"
                name="address"
                id="address"
                className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                value={ConfirmOrderDetails.address}
                onChange={formChangeHandler}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-white font-semibold">
              City:
            </label>
            <div className="rounded-md bg-white flex items-center ">
              <input
                type="text"
                name="city"
                id="city"
                className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                value={ConfirmOrderDetails.city}
                onChange={formChangeHandler}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="text-white font-semibold">
              State:
            </label>
            <div className="rounded-md bg-white flex items-center ">
              <input
                type="text"
                name="state"
                id="state"
                className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                value={ConfirmOrderDetails.state}
                onChange={formChangeHandler}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn-addToCart"
        onClick={() => {
          placeOrder();
        }}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default ConfirmOrder;
