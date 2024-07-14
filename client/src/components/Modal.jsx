import React from "react";
import { modalActions } from "../store/Modal";
import { useDispatch } from "react-redux";
const Modal = ({ modalWidth, children }) => {
  const dispatch = useDispatch();
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 m-0">
      <div
        className={`relative bg-brand-primary font-brandFont text-white p-5 rounded-xl shadow-lg  max-h-[35rem] overflow-y-scroll overflow-x-hidden ${modalWidth}`}
      >
        <button
          className="absolute top-0 right-0 m-3 text-white rounded-xl font-bold text-xl"
          onClick={() => {
            dispatch(modalActions.toggleModal(""));
          }}
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
