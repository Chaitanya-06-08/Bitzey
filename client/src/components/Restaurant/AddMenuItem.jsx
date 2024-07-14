import axios from "../../util/axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/Loading";
import Loader from "../Loader";
import toast from "react-hot-toast";
import requestAccessTokenRefresh from "../../util/requestAccessTokenRefresh";

const AddMenuItem = () => {
  const restaurant = useSelector((state) => state.restaurant);
  const showLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const Categories = [
    "Starters",
    "Biryani",
    "Fast Food",
    "Sweets",
    "Desserts",
    "Curries",
  ];

  const [item, setItem] = useState({
    _id: "",
    name: "",
    category: "",
    price: 0,
    imageUrl: "",
    public_id: "",
    description: "",
    servesfor: 1,
    type: "veg",
  });
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      [
        item.name,
        item.category,
        item.price,
        item.description,
        item.imageUrl,
        item.type,
        item.servesfor,
      ].some((field) => {
        if (typeof field === "string") {
          return !field.trim();
        } else if (typeof field === "number") {
          return field === 0;
        } else {
          return !field;
        }
      })
    ) {
      console.log(item);
      toast.error("All fields must be filled");
      return;
    }
    dispatch(loadingActions.toggleLoading());
    try {
      let response = await axios.post(
        `/api/addMenuItem`,
        {
          ...item,
          restaurant_id: restaurant.restaurant_id,
        },
        { withCredentials: true }
      );
      // console.log(response);
      toast.success(response.data.message);
      setItem({
        name: "",
        category: "",
        price: 0,
        imageUrl: "",
        public_id: "",
        description: "",
        servesfor: 1,
        type: "",
      });
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        await requestAccessTokenRefresh(user, location, navigate);
      } else {
        toast.error(error.message);
      }
    } finally {
      dispatch(loadingActions.toggleLoading());
    }
  };

  const formChangeHandler = (e) => {
    setItem((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(item);
  };
  const uploadImage = async (e) => {
    let file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folderName", "FoodItemImages");
    dispatch(loadingActions.toggleLoading());
    try {
      const response = await axios.post("/api/uploadToCloudinary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setItem((prev) => {
        return {
          ...prev,
          imageUrl: response.data.imageUrl,
          public_id: response.data.public_id,
        };
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    dispatch(loadingActions.toggleLoading());
  };
  const deleteImage = async () => {
    dispatch(loadingActions.toggleLoading());
    try {
      const response = await axios.post("/api/deleteImageFromCloudinary", {
        public_id: item.public_id,
      });
      console.log(response);
      if (response.status == 200) {
        setItem((prev) => {
          console.log("called");
          return { ...prev, imageUrl: "", public_id: "" };
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    dispatch(loadingActions.toggleLoading());
  };
  return (
    <>
      <div className="font-brandFont flex flex-col space-y-3">
        {!showLoading && (
          <>
            <h1 className="text-3xl text-brand-primary w-full p-4 border-b-4 border-gray-300 text-center font-bold">
              Add Menu Item
            </h1>
            <div className="mx-auto w-1/2">
              <form
                onSubmit={formSubmitHandler}
                className="my-4 p-8 bg-brand-primary text-white flex flex-col  space-y-3 rounded-lg"
                encType="multipart/form-data"
              >
                <h1 className="text-2xl">Item Details:</h1>
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-white font-semibold">
                    Item Name:
                  </label>
                  <div className="rounded-md bg-white flex items-center ">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={item.name}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="category"
                    className="text-white font-semibold"
                  >
                    Category:
                  </label>
                  <div className="flex flex-wrap justify-start space-x-4 px-2">
                    {Categories.map((category, ind) => {
                      return (
                        <div
                          key={ind}
                          name="category"
                          value={category}
                          className={`${
                            item.category == category
                              ? "bg-white text-brand-primary"
                              : ""
                          } text-xl rounded-md border-2 border-gray-300 my-2 px-3 py-2 transition-all cursor-pointer`}
                          onClick={() => {
                            setItem((prev) => {
                              return { ...prev, category: category };
                            });
                          }}
                        >
                          {category}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price" className="text-white font-semibold">
                    Price:
                  </label>
                  <div className="rounded-md bg-white flex items-center ">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      name="price"
                      id="price"
                      className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={item.price}
                    />
                  </div>
                </div>
                <div className="h-72 w-full border-4 bg-white border-gray-400 rounded-lg flex flex-col items-center justify-center border-dotted relative">
                  {item.imageUrl == "" && (
                    <label className="w-full h-full relative cursor-pointer">
                      <input
                        type="file"
                        name="imageUrl"
                        className=" hidden"
                        onChange={uploadImage}
                        accept="image/*"
                      />
                      <div className=" w-full absolute flex flex-col items-center top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
                        <IoIosCloudUpload className="text-brand-primary text-6xl" />
                        <p className="text-xl text-brand-primary">
                          Upload Image
                        </p>
                      </div>
                    </label>
                  )}
                  {item.imageUrl != "" && (
                    <>
                      <img
                        src={item.imageUrl}
                        alt="Uploaded image"
                        className="object-contain w-full h-full"
                      />
                      <button
                        className="bg-gray-300 text-4xl text-brand-primary absolute right-8 top-8 p-2 rounded-full"
                        onClick={deleteImage}
                      >
                        <MdDelete />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="text-white font-semibold"
                  >
                    Description:
                  </label>
                  <div className="rounded-md bg-white flex items-center ">
                    <textarea
                      name="description"
                      id="description"
                      className="h-full w-full bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={item.description}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="servesfor"
                    className="text-white font-semibold"
                  >
                    Number of people, the item can be served for:
                  </label>
                  <input
                    type="number"
                    name="servesfor"
                    id="servesfor"
                    value={item.servesfor}
                    min={1}
                    placeholder="hr"
                    className="h-full w-24 bg-white py-2 text-brand-primary px-4 rounded-md focus:outline-none"
                    onChange={formChangeHandler}
                  />
                </div>
                <div className="flex space-x-4">
                  <label
                    htmlFor="itemtype"
                    className="text-white font-semibold"
                  >
                    Item Type:
                  </label>
                  <div className="flex space-x-2 text-lg items-center">
                    <input
                      type="radio"
                      name="type"
                      id="type"
                      value="veg"
                      className="size-5"
                      onChange={formChangeHandler}
                      checked
                    />
                    <span>Veg</span>
                  </div>
                  <div className="flex space-x-2 text-lg items-center">
                    <input
                      type="radio"
                      name="type"
                      id="type"
                      value="non-veg"
                      className="size-5"
                      onChange={formChangeHandler}
                    />
                    <span>Non-Veg</span>
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  Add Item
                </button>
              </form>
            </div>
          </>
        )}
        {showLoading && <Loader />}
      </div>
    </>
  );
};

export default AddMenuItem;
