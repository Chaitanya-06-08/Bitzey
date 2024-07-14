import React from "react";
import { modalActions } from "../store/Modal";
import { loadingActions } from "../store/Loading";
import { useDispatch } from "react-redux";
import axios from "../util/axios";
const CancelOrder = ({ onCancelOrderClicked }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center space-y-2">
      <h1 className="text-2xl font-semibold text-white">
        Are you sure to cancel your order? You might miss out some delicious
        meal.
      </h1>
      <div className="flex space-x-2 items-center justify-end">
        <button
          className="btn-primary"
          onClick={() => {
            dispatch(modalActions.toggleModal(""));
          }}
        >
          No
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            dispatch(modalActions.toggleModal(""));
            onCancelOrderClicked();
            dispatch(loadingActions.toggleLoading());
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default CancelOrder;
