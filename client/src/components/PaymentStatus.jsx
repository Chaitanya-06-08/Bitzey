import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { useEffect } from "react";
import axios from "../util/axios";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/Cart";
import { modalActions } from "../store/Modal";
const PaymentStatus = () => {
  const { payment_reference_id } = useParams();
  const order = JSON.parse(localStorage.getItem("order"));
  // console.log(order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const placeOrder = async () => {
      try {
        let response = await axios.post(
          "/api/placeOrder",
          {
            ...order,
            payment_reference_id,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        console.log("navigating to home");
        navigate("/");
        dispatch(cartActions.clearCart());
        dispatch(modalActions.toggleModal("orderSuccess"));
        localStorage.removeItem("order");
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
    if (payment_reference_id && order) placeOrder();
  }, [payment_reference_id]);

  return <Loader />;
};

export default PaymentStatus;
