import React from "react";
import { modalActions } from "../store/Modal";
import { useDispatch } from "react-redux";
const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-brand-primary font-brandFont text-white p-5 rounded-xl shadow-lg min-w-1/3 max-h-[35rem] overflow-y-scroll overflow-x-hidden">
        <button
          className="absolute top-0 right-0 m-3 text-white rounded-xl font-bold"
          onClick={() => {
            dispatch(modalActions.toggleModal());
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

{
  /* <Modal>
  <div className="p-4 flex flex-col space-y-4">
    <div className="text-xl">Login To see your past orders</div>
    <div>
      <button className="btn-primary">Login</button>
    </div>
  </div>
</Modal>; */
}
