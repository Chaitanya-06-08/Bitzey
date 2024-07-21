import axios from "../../util/axios";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { getState } from "../../util/getState";
import { loadingActions } from "../../store/Loading";
import requestAccessTokenRefresh from "../../util/requestAccessTokenRefresh";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { modalActions } from "../../store/Modal";
import Modal from "../Modal";
import EditMenuItem from "./EditMenuItem";
import { motion } from "framer-motion";
const Menu = () => {
  let dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  const [render, setRender] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchBar, setSearchBar] = useState("");
  const showLoading = getState("loading");
  const restaurant = getState("restaurant");
  const showModal = getState("modal");
  useEffect(() => {
    const getItems = async () => {
      if (!showLoading) dispatch(loadingActions.toggleLoading());
      if (restaurant.restaurant_id) {
        try {
          let response = await axios.get("/api/getItemsByRestaurantId", {
            params: {
              restaurant_id: restaurant.restaurant_id,
            },
            withCredentials: true,
          });
          // console.log(response);
          setItems(response.data.items);
          setTempItems(response.data.items);
        } catch (error) {
          console.log(error);
          if (error.response?.status == 403) {
            await requestAccessTokenRefresh(user, location, navigate, dispatch);
          } else {
            toast.error(error.message);
          }
        } finally {
          dispatch(loadingActions.toggleLoading());
        }
      }
    };
    getItems();
    console.log(items);
  }, [render, restaurant.restaurant_id]);

  const deleteItem = async (item) => {
    dispatch(loadingActions.toggleLoading());
    try {
      let response = await axios.post(
        "/api/deleteMenuItem",
        {
          _id: item._id,
          public_id: item.public_id,
        },
        { withCredentials: true }
      );
      // console.log(response);
      toast.success(response.data.message);
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        await requestAccessTokenRefresh(user, location, navigate, dispatch);
      } else {
        toast.error(error.message);
      }
    }
    dispatch(loadingActions.toggleLoading());
  };

  const searchClickHandler = () => {
    if (!searchBar || searchBar.length == 0) {
      setTempItems(items);
      return;
    }
    let filteredItems = items.filter((item) => {
      return item.name == searchBar || item.category == searchBar;
    });
    console.log(filteredItems);
    setTempItems(filteredItems);
  };

  let previous = null;
  useEffect(() => {
    if (previous) {
      clearTimeout(previous);
    }
    previous = setTimeout(() => {
      if (!searchBar || searchBar.length == 0) {
        setTempItems(items);
        return;
      }
      let filteredItems = items.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchBar.toLowerCase()) ||
          item.category.toLowerCase().includes(searchBar.toLowerCase())
        );
      });
      // console.log(filteredItems);
      setTempItems(filteredItems);
    }, 500);
    return () => {
      clearTimeout(previous);
    };
  }, [searchBar, items]);

  return (
    <>
      {showLoading && <Loader />}
      {!showLoading && (
        <div className="font-brandFont flex flex-col space-y-3 px-4">
          <h1 className="text-3xl text-brand-primary w-full p-4 border-b-4 border-gray-300 text-center font-bold">
            Menu
          </h1>
          <div className="w-full flex justify-between items-center space-x-2 py-4 px-2 my-3">
            <div className="flex items-center space-x-2 ">
              <input
                type="text"
                name="search"
                id="search"
                className="border-2 border-gray-400 rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-brand-shade focus:border-brand-primary transition-all"
                placeholder="Search name or category..."
                onChange={(e) => {
                  setSearchBar(e.target.value.toLowerCase());
                }}
                value={searchBar}
              />
              {searchBar.length > 0 && (
                <IoMdClose
                  className="font-bold text-4xl bg-gray-300 cursor-pointer hover:bg-brand-primary hover:text-white rounded-full p-2"
                  onClick={() => {
                    setSearchBar("");
                  }}
                />
              )}
              <IoSearchOutline
                className="font-bold text-4xl bg-gray-300 cursor-pointer hover:bg-brand-primary hover:text-white rounded-full p-2"
                onClick={searchClickHandler}
              />
            </div>
            <FiRefreshCcw
              className=" bg-gray-300 rounded-lg text-4xl p-2 hover:bg-brand-primary hover:text-white cursor-pointer"
              onClick={() => {
                setRender((prev) => !prev);
              }}
            />
          </div>
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            className="flex flex-col  space-y-3 border-2 border-gray-300 rounded-lg"
          >
            <tbody>
              <tr className="grid grid-cols-5 text-center py-3">
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                {/* <th>Description</th> */}
                <th>Actions</th>
              </tr>
              {tempItems.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="grid grid-cols-5 text-center even:bg-gray-100  rounded-lg py-2"
                  >
                    <td className="rounded-lg flex justify-center">
                      <img
                        src={item.imageUrl}
                        alt="Item img"
                        className="w-36 h-20 object-contain"
                      />
                    </td>
                    <td className="flex items-center justify-center">
                      {item.name}
                    </td>
                    <td className="flex items-center justify-center">
                      {item.category}
                    </td>
                    <td className="flex items-center justify-center">
                      Rs.{item.price}
                    </td>
                    {/* <td className="flex items-center justify-center">
                      <p className="overflow-hidden text-ellipsis w-full">{item.description}</p>
                    </td> */}
                    <td className="flex items-center justify-center space-x-2">
                      <button
                        className="btn-primary text-2xl font-bold"
                        onClick={(e) => {
                          setEditItem(item);
                          dispatch(modalActions.toggleModal("editMenuItem"));
                        }}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="btn-primary text-2xl font-bold"
                        onClick={() => {
                          deleteItem(item);
                        }}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {tempItems.length == 0 && (
                <tr className="flex flex-col items-center justify-center p-6">
                  <td className="text-2xl text-brand-primary font-bold">
                    No items found....
                  </td>
                </tr>
              )}
            </tbody>
          </motion.table>
        </div>
      )}
      {showModal == "editMenuItem" && (
        <Modal modalWidth="min-w-1/3">
          <EditMenuItem item={editItem} setItem={setEditItem} />
        </Modal>
      )}
    </>
  );
};

export default Menu;
