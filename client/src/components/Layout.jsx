import React from "react";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { getState } from "../util/getState";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/Modal";
import { cartActions } from "../store/Cart";
import ConfirmOrder from "./ConfirmOrder";
import orderSuccess from "../assets/order-success.png";
import ProfileImageEdit from "./ProfileImageEdit";
import Hamburger from "./Hamburger";
import useModalData from "../hooks/useModalData";
const Layout = () => {
  const { modalData } = useModalData();
  const showSidebar = getState("sidebar");
  const showModal = getState("modal");
  const showLoading = getState("loading");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-white w-full h-full flex font-brand-primaryFont">
        {showSidebar && <Sidebar />}
        {!showSidebar && <Hamburger />}
        <div
          className={`${
            showSidebar ? "w-4/5" : "w-[97%]"
          } h-screen overflow-y-scroll`}
        >
          {/* navigation */}
          <Navigation></Navigation>

          {/* outlet */}
          <Outlet></Outlet>
          {!showLoading && <Footer></Footer>}
        </div>
      </div>
      {showModal == "loginToPlaceOrder" && (
        <Modal modalWidth="w-1/3">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl">Login Or Signup</h1>
            <p>
              To place your order now, login to your existing account or signup
            </p>
            <div className="flex space-x-2 items-center justify-end">
              <button
                className="btn-secondary"
                onClick={() => {
                  navigate("/auth/login/customer");
                  dispatch(modalActions.toggleModal(""));
                }}
              >
                Login
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  navigate("/auth/signup/customer");
                  dispatch(modalActions.toggleModal(""));
                }}
              >
                Signup
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showModal == "confirmDeliveryDetails" && (
        <Modal modalWidth="w-1/2">
          <ConfirmOrder />
        </Modal>
      )}
      {showModal == "orderSuccess" && (
        <Modal modalWidth="w-1/2">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-1/5 h-1/5">
              <img
                src={orderSuccess}
                alt="order success img"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-semibold text-white">
              Yaay! There you go, your order was placed successfully.
            </h1>
            <p className="text-lg font-light text-white">
              Thankyou for ordering. You shall receive it no time.
            </p>
            <div className="flex space-x-2 items-center justify-end">
              <button
                className="btn-secondary"
                onClick={() => {
                  navigate("/restaurants");
                  dispatch(modalActions.toggleModal(""));
                }}
              >
                Order More
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  navigate("orders");
                  dispatch(modalActions.toggleModal(""));
                }}
              >
                Show My Orders
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showModal == "profileImageEdit" && (
        <Modal modalWidth="w-1/3 p-8">
          <ProfileImageEdit />
        </Modal>
      )}
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
                  console.log(modalData);
                  dispatch(cartActions.addToCart(modalData));
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

export default Layout;
