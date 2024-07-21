import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getState } from "../../util/getState";
import axios from "../../util/axios";
import { loadingActions } from "../../store/Loading";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { LiaCitySolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Navigation from "../Navigation";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RestaurantSignup = () => {
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordType: "password",
    restaurantName: "",
    city: "",
    state: "",
    address: "",
    restaurantImage: "",
    public_id: "",
    cuisines: [],
    opentime: {
      openhour: "",
      openminute: "",
    },
    closetime: {
      closehour: "",
      closeminute: "",
    },
  });
  console.log(signupDetails);
  const cuisines = [
    "American",
    "Chinese",
    "Hyderbadi",
    "Biryani",
    "North Indian",
    "South Indian",
    "Juices",
    "Beverages",
    "Kebab",
    "Pizza",
    "Fast Food",
    "Dessert",
    "korean",
  ];
  const showLoading = getState("loading");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);

  const toggleCuisine = (cuisine) => {
    setSignupDetails((prev) => {
      const { cuisines } = prev;
      return {
        ...prev,
        cuisines: cuisines.includes(cuisine)
          ? cuisines.filter((curr) => curr !== cuisine)
          : [...cuisines, cuisine],
      };
    });
  };

  const nextFormStep = (e) => {
    let { username, email, password, confirmPassword } = signupDetails;
    if (
      !(
        username.trim() &&
        email.trim() &&
        password.trim() &&
        confirmPassword.trim()
      )
    ) {
      toast.error("All fileds must be filled");
    } else if (password != confirmPassword) {
      toast.error("Passwords do not match");
    } else setFormStep((prev) => prev + 1);
  };

  const previousFormStep = (e) => {
    setFormStep((prev) => prev - 1);
  };

  const formsubmitHandler = async (e) => {
    e.preventDefault();
    let { restaurantName, city, state, address, restaurantImage } =
      signupDetails;
    if (
      [restaurantName, city, state, address, restaurantImage].some((field) => {
        return !field || field.trim() == "";
      })
    ) {
      toast.error("All fileds must be filled");
    } else {
      dispatch(loadingActions.toggleLoading());
      try {
        let opentimedate = new Date();
        opentimedate.setHours(
          signupDetails.opentime.openhour,
          signupDetails.opentime.openminute
        );
        let closetimedate = new Date();
        closetimedate.setHours(
          signupDetails.closetime.closehour,
          signupDetails.closetime.closeminute
        );
        const response = await axios.post(
          "/api/restaurantSignup",
          {
            user: {
              username: signupDetails.username,
              email: signupDetails.email,
              password: signupDetails.password,
              usertype: "restaurant",
            },
            name: signupDetails.restaurantName,
            image: {
              imageUrl: signupDetails.restaurantImage,
              public_id: signupDetails.public_id,
            },
            location: {
              address: signupDetails.address,
              city: signupDetails.city,
              state: signupDetails.state,
            },
            cuisines: signupDetails.cuisines,
            opentime: opentimedate,
            closetime: closetimedate,
          },
          { withCredentials: true }
        );
        console.log(response);
        if (response.status == 200) {
          toast.success(response.data.message);
          navigate("/auth/login/restaurant");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      dispatch(loadingActions.toggleLoading());
    }
  };

  const formChangeHandler = (e) => {
    setSignupDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value.trim(),
      };
    });
  };

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folderName", "RestaurantImages");
    dispatch(loadingActions.toggleLoading());
    try {
      const response = await axios.post("/api/uploadToCloudinary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response);
      setSignupDetails((prev) => {
        return {
          ...prev,
          restaurantImage: response.data.imageUrl,
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
      const response = await axios.post(
        "/api/deleteImageFromCloudinary",
        {
          public_id: signupDetails.public_id,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status == 200) {
        setSignupDetails((prev) => {
          return { ...prev, restaurantImage: "", public_id: "" };
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
      <Navigation />
      {!showLoading && (
        <div className="bg-brand-primary rounded-xl w-2/3 mx-auto my-12 flex flex-col items-center space-y-8 font-brandFont p-8">
          <div className="flex flex-col">
            <p className="text-4xl text-white font-bold my-4">
              Restaurant Signup
            </p>
            <p className="text-xl text-white font-light">
              Fill up below details to get started
            </p>
            <div className=" mt-2 flex items-center justify-center">
              <span
                className={`${
                  formStep == 0
                    ? "bg-brand-third text-brand-primary"
                    : "bg-green-400 text-white"
                } rounded-full px-4 py-2 font-bold transition-all duration-300`}
              >
                1
              </span>
              <span
                className={`${
                  formStep == 0 ? "bg-brand-third" : "bg-green-400"
                } h-1 w-24 transition-all duration-300 delay-200`}
              ></span>
              <span className="rounded-full bg-brand-third text-brand-primary px-4 py-2 font-bold ">
                2
              </span>
            </div>
          </div>
          <form
            onSubmit={formsubmitHandler}
            className="w-full space-y-2"
            encType="multipart/form-data"
          >
            {formStep == 0 && (
              <div className="flex flex-col w-full items-center space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="text-white font-semibold"
                  >
                    Username
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.username}
                    />
                    <FaUser className="text-brand-primary text-3xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-white font-semibold">
                    Email
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.email}
                    />
                    <MdEmail className="text-brand-primary text-3xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-white font-semibold"
                  >
                    Password
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type={signupDetails.passwordType}
                      name="password"
                      id="password"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.password}
                    />
                    {signupDetails.passwordType === "password" && (
                      <FaEye
                        className="text-brand-primary text-3xl cursor-pointer"
                        onClick={() => {
                          setSignupDetails((prev) => {
                            return {
                              ...prev,
                              passwordType: "text",
                            };
                          });
                        }}
                      />
                    )}
                    {signupDetails.passwordType === "text" && (
                      <FaEyeSlash
                        className="text-brand-primary text-3xl cursor-pointer"
                        onClick={() => {
                          setSignupDetails((prev) => {
                            return {
                              ...prev,
                              passwordType: "password",
                            };
                          });
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-white font-semibold"
                  >
                    Confirm Password
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type="text"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.confirmPassword}
                    />
                    <RiLockPasswordFill className="text-brand-primary text-3xl" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="btn-primary w-36" onClick={nextFormStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {formStep == 1 && (
              <div className="flex flex-col w-full items-center space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="restaurantName"
                    className="text-white font-semibold"
                  >
                    Restaurant Name
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type="text"
                      name="restaurantName"
                      id="restaurantName"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.restaurantName}
                    />
                    <MdRestaurantMenu className="text-brand-primary text-3xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-white font-semibold">
                    Address
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.address}
                    />
                    <FaLocationDot className="text-brand-primary text-3xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city" className="text-white font-semibold">
                    City
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.city}
                    />
                    <FaCity className="text-brand-primary text-3xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="state" className="text-white font-semibold">
                    State
                  </label>
                  <div className="rounded-md bg-white flex items-center pr-4">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="h-full w-96 bg-transparent py-2 text-brand-primary px-4 focus:rounded-md focus:outline-none"
                      onChange={formChangeHandler}
                      value={signupDetails.state}
                    />
                    <LiaCitySolid className="text-brand-primary text-3xl" />
                  </div>
                </div>

                <div className="h-72 w-1/2 border-4 bg-white border-gray-400 rounded-lg flex flex-col items-center justify-center border-dotted relative">
                  {signupDetails.restaurantImage == "" && (
                    <label className="w-full h-full relative cursor-pointer">
                      <input
                        type="file"
                        name="restaurantImage"
                        className=" hidden"
                        onChange={uploadImage}
                        accept="image/*"
                      />
                      <div className=" w-full absolute flex flex-col items-center top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
                        <IoIosCloudUpload className="text-brand-primary text-6xl" />
                        <p className="text-xl text-brand-primary">
                          Upload your Restaurant Image
                        </p>
                      </div>
                    </label>
                  )}
                  {signupDetails.restaurantImage != "" && (
                    <>
                      <img
                        src={signupDetails.restaurantImage}
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
                <div className="flex flex-col space-y-3 text-white px-24">
                  <label
                    htmlFor="cuisines"
                    className="text-white font-semibold"
                  >
                    Cuisines served:
                  </label>
                  <div className="flex flex-wrap justify-start gap-1 px-2">
                    {cuisines.map((cuisine, ind) => {
                      return (
                        <div
                          key={ind}
                          name="cuisine"
                          value={cuisine}
                          className={`${
                            signupDetails.cuisines.includes(cuisine)
                              ? "bg-white text-brand-primary"
                              : ""
                          } text-xl rounded-md border-2 border-gray-300 my-2 px-3 py-2 transition-all cursor-pointer`}
                          onClick={() => {
                            toggleCuisine(cuisine);
                          }}
                        >
                          {cuisine}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="opentime"
                    className="text-white font-semibold"
                  >
                    Open Time(24 hr Format):
                  </label>
                  <div className="flex space-x-3 items-center">
                    <input
                      type="number"
                      name="openhour"
                      id="openhour"
                      value={signupDetails.opentime.openhour}
                      min={0}
                      max={23}
                      placeholder="hr"
                      className="h-full w-fit bg-white py-2 text-brand-primary px-4 rounded-md focus:outline-none"
                      onChange={(e) => {
                        setSignupDetails((prev) => {
                          return {
                            ...prev,
                            opentime: {
                              ...prev.opentime,
                              openhour: e.target.value,
                            },
                          };
                        });
                      }}
                    />
                    <span className="text-xl text-white font-bold"> : </span>
                    <input
                      type="number"
                      name="openminute"
                      id="openminute"
                      value={signupDetails.opentime.openminute}
                      min={0}
                      max={59}
                      placeholder="min"
                      className="h-full w-fit bg-white py-2 text-brand-primary px-4 rounded-md focus:outline-none"
                      onChange={(e) => {
                        setSignupDetails((prev) => {
                          return {
                            ...prev,
                            opentime: {
                              ...prev.opentime,
                              openminute: e.target.value,
                            },
                          };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="closetime"
                    className="text-white font-semibold"
                  >
                    Close Time(24 hr Format):
                  </label>
                  <div className="flex space-x-3 items-center">
                    <input
                      type="number"
                      name="closehour"
                      id="closehour"
                      value={signupDetails.closetime.closehour}
                      min={0}
                      max={23}
                      placeholder="hr"
                      className="h-full w-fit bg-white py-2 text-brand-primary px-4 rounded-md focus:outline-none"
                      onChange={(e) => {
                        setSignupDetails((prev) => {
                          return {
                            ...prev,
                            closetime: {
                              ...prev.closetime,
                              closehour: e.target.value,
                            },
                          };
                        });
                      }}
                    />
                    <span className="text-xl text-white font-bold"> : </span>
                    <input
                      type="number"
                      name="closeminute"
                      id="closeminute"
                      value={signupDetails.closetime.closeminute}
                      min={0}
                      max={59}
                      placeholder="min"
                      className="h-full w-fit bg-white py-2 text-brand-primary px-4 rounded-md focus:outline-none"
                      onChange={(e) => {
                        setSignupDetails((prev) => {
                          return {
                            ...prev,
                            closetime: {
                              ...prev.closetime,
                              closeminute: e.target.value,
                            },
                          };
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between space-x-8">
                  <button
                    className="btn-primary w-36"
                    onClick={previousFormStep}
                  >
                    Back
                  </button>
                  <button className="btn-primary w-36" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
      {showLoading && <Loader />}
    </>
  );
};

export default RestaurantSignup;
