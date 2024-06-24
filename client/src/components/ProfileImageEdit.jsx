import React, { useState } from "react";

import { IoIosCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loadingActions } from "../store/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { getState } from "../util/getState";
import Loader from "./Loader";
import { userActions } from "../store/User";
const ProfileImageEdit = () => {
  const user = getState("user");
  const [profileImage, setProfileImage] = useState({
    imageUrl: user.image.imageUrl,
    public_id: user.image.public_id,
  });
  const dispatch = useDispatch();
  const showLoading = getState("loading");
  const uploadImage = async (e) => {
    let file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folderName", "UserProfileImages");
    dispatch(loadingActions.toggleLoading());
    try {
      const response = await axios.post("/api/uploadToCloudinary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response);
      await axios.post(
        "/api/setUserProfileImage",
        {
          _id: user._id,
          imageUrl: response.data.imageUrl,
          public_id: response.data.public_id,
        },
        { withCredentials: true }
      );
      toast.success("Image Uploaded");
      setProfileImage((prev) => {
        return {
          ...prev,
          imageUrl: response.data.imageUrl,
          public_id: response.data.public_id,
        };
      });
      dispatch(
        userActions.setUserProfileImage({
          imageUrl: response.data.imageUrl,
          public_id: response.data.public_id,
        })
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
    dispatch(loadingActions.toggleLoading());
  };

  const deleteImage = async () => {
    dispatch(loadingActions.toggleLoading());
    try {
      const response = await axios.post("/api/deleteImageFromCloudinary", {
        public_id: profileImage.public_id,
      });
      // console.log(response);
      await axios.post(
        "/api/removeUserProfileImage",
        {
          _id: user._id,
        },
        { withCredentials: true }
      );
      toast.success("Image removed");
      setProfileImage((prev) => {
        return { ...prev, imageUrl: "", public_id: "" };
      });
      dispatch(userActions.removeUserProfileImage());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
    dispatch(loadingActions.toggleLoading());
  };

  return (
    <div className="w-full h-72">
      {showLoading && <Loader />}
      {!showLoading && (
        <div className="h-72 w-full border-4 bg-white border-gray-400 rounded-lg flex flex-col items-center justify-center border-dotted relative">
          {profileImage.imageUrl == "" && (
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
                <p className="text-xl text-brand-primary">Upload your Image</p>
              </div>
            </label>
          )}
          {profileImage.imageUrl != "" && (
            <>
              <img
                src={profileImage.imageUrl}
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
      )}
    </div>
  );
};

export default ProfileImageEdit;
