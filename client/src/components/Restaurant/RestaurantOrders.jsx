import React, { useEffect, useState } from "react";
import Hamburger from "../Hamburger";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/Loading";
import { FaCircle } from "react-icons/fa";
import { BsFillTriangleFill } from "react-icons/bs";
import requestAccessTokenRefresh from "../../util/requestAccessTokenRefresh";
import axios from "axios";
import toast from "react-hot-toast";
import Dropdown from "../Dropdown";
import CancelOrder from "../CancelOrder";
import Modal from "../Modal";
import NoOrdersFound from "../../assets/no-orders-found.png";
import { useNavigate } from "react-router-dom";
import { getState } from "../../util/getState";
const RestaurantOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurant = getState("restaurant");
  const user = getState("user");
  const showSidebar = getState("sidebar");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const getOrders = async () => {
    dispatch(loadingActions.toggleLoading());
    try {
      let response = await axios.get(
        `/api/getOrdersByRestaurantId?_id=${restaurant.restaurant_id}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      setOriginalOrders(response.data.orders);
      setFilteredOrders(response.data.orders);
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
        toast.error(error.message);
      }
    } finally {
      dispatch(loadingActions.toggleLoading());
    }
  };
  useEffect(() => {
    if (user._id) getOrders();
  }, [user]);

  const handleOptionClick = (option) => {
    if (option == "All") {
      setFilteredOrders(originalOrders);
    } else {
      let orders = originalOrders.filter(
        (order) => order.deliveryStatus == option.toLowerCase()
      );
      setFilteredOrders(orders);
    }
  };
  const cancelOrder = async (_id) => {
    try {
      let response = await axios.post(`/api/cancelOrder?_id=${_id}`);
      console.log(response.data);
      await getOrders();
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
        toast.error(error.message);
      }
    }
  };
  const updateOrderStatus = async (status, _id) => {
    try {
      let response = await axios.post(`/api/updateOrderStatus`, {
        _id,
        status:status.toLowerCase(),
      });
      console.log(response.data);
      await getOrders();
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
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <Hamburger />
      <div
        className={`${
          showSidebar ? "" : "max-w-[60%]"
        } flex flex-col space-y-3 mx-auto max-w-[90%] font-brandFont my-3`}
      >
        {originalOrders.length > 0 ? (
          <OrdersLayout
            heading="Orders"
            filteredOrders={filteredOrders}
            handleOptionClick={handleOptionClick}
            cancelOrder={cancelOrder}
            onOrderStatusUpdate={updateOrderStatus}
          />
        ) : (
          <div className="w-full h-96 rounded-xl flex items-center">
            <img
              src={NoOrdersFound}
              alt="No orders found img"
              className="w-1/2 h-full object-contain"
            />
            <div className="w-1/2 flex flex-col space-y-2 items-center">
              <h1 className=" text-xl font-semibold text-brand-primary">
                No orders were made yet...
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantOrders;

const OrdersLayout = ({
  heading,
  filteredOrders,
  handleOptionClick,
  cancelOrder,
  onOrderStatusUpdate,
}) => {
  const showModal = getState("modal");

  function formatTime(date) {
    date = new Date(date);
    date.setMinutes(date.getMinutes() + 30);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  function returnOrderedTime(date) {
    date = new Date(date);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${dayOfWeek}, ${day}${daySuffix} ${month},at ${hours}:${minutes}`;
  }

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
        <h1 className="text-3xl text-brand-primary w-full border-b-2 border-b-gray-200 py-2 font-bold">
            {heading}
          </h1>
          <Dropdown
            placeholder={"Sort By"}
            options={["All", "Pending", "Delivered", "Cancelled"]}
            onOptionClicked={handleOptionClick}
            width={"w-36"}
          />
        </div>
        {filteredOrders.length > 0 && (
          <div className="flex flex-col space-y-3">
            {filteredOrders?.map((order, ind) => {
              return (
                <>
                  <div
                    key={ind}
                    className="rounded-xl border-2 border-gray-300 w-full p-3 bg-white shadow-xl"
                  >
                    <div className="flex space-x-4 ">
                      <div className="w-1/4 h-full rounded-xl">
                        <img
                          src={order.restaurant_id.image.imageUrl}
                          alt=""
                          className="w-full h-full object-fill rounded-xl"
                        />
                      </div>
                      <div className="w-3/4 flex flex-col space-y-2">
                        <h2 className="text-xl text-brand-primary font-bold flex justify-between">
                          <span>Order ID: {order._id}</span>
                          <span>{returnOrderedTime(order.createdAt)}</span>
                        </h2>
                        <h2 className="text-xl text-green-500 font-bold">
                          {order.deliveryStatus == "pending" ? (
                            <span>
                              Estimated Delivery By:{" "}
                              {formatTime(order.createdAt)}
                            </span>
                          ) : (
                            <span>
                              Delivery Status : {order.deliveryStatus}
                            </span>
                          )}
                        </h2>
                        <div className="flex space-x-4 bg-gray-100 rounded-xl py-2 px-4">
                          <div className="flex items-start space-x-2 w-1/2">
                            <p className="text-green-500 font-semibold">To:</p>
                            <div className="flex flex-col">
                              <p>{order.customerName}</p>
                              <p>{order.deliveryLocation.address}</p>
                              <p>
                                {order.deliveryLocation.city},{" "}
                                {order.deliveryLocation.state}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 px-8 flex flex-col justify-between space-y-3">
                      <div className="flex space-x-4">
                        <p className="text-xl font-semibold ">Order Details :</p>
                        <div className="flex flex-wrap items-center space-x-3">
                          {order.items.map((item, ind) => {
                            return (
                              <p key={ind} className="flex space-x-2">
                                <span>
                                  {item.item_id.type == "veg" && (
                                    <FaCircle className="text-green-500 p-1 rounded-lg border-2 border-green-500 font-bold w-fit text-2xl" />
                                  )}
                                  {item.item_id.type == "non-veg" && (
                                    <BsFillTriangleFill className="text-red-500 rounded-lg border-2 border-red-500 font-bold w-fit text-2xl p-1" />
                                  )}{" "}
                                </span>
                                <span>
                                  {item.item_id.name} x{item.quantity}
                                </span>
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <p className="font-semibold">
                        Total Amount: &#8377;{order.totalPrice}
                      </p>
                      <div className="flex space-x-3">
                        {order.deliveryStatus != "delivered" && (
                          <>
                            <div className="flex items-center space-x-2">
                              <p className="w-full font-bold text-xl">Status Of Order:</p>
                              <Dropdown
                                placeholder={"Order Status"}
                                options={["Pending","Out For Delivery", "Delivered"]}
                                width={"w-52"}
                                currentOption={order.deliveryStatus}
                                onOptionClicked={(status) => {
                                  onOrderStatusUpdate(status, order._id);
                                }}
                              />
                            </div>
                            {/* <button
                              className="btn-primary"
                              onClick={() => {
                              }}
                            >
                              Update Status
                            </button> */}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {showModal == "cancelOrder" && (
                    <Modal modalWidth="w-1/2">
                      <CancelOrder
                        onCancelOrderClicked={() => {
                          cancelOrder(order._id);
                        }}
                      />
                    </Modal>
                  )}
                </>
              );
            })}
          </div>
        )}
        {filteredOrders.length == 0 && (
          <h1 className="text-3xl text-brand-primary font-bold">
            No matched orders found...
          </h1>
        )}
      </div>
    </>
  );
};
