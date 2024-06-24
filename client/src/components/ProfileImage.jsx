import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getState } from "../util/getState";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/Modal";
const ProfileImage = () => {
  const user = getState("user");
  const dispatch = useDispatch();
  return (
    <>
      {user?.image?.imageUrl == "" ? (
        <CgProfile className="size-3/4" />
      ) : (
        <div className="size-36 flex items-center justify-center">
          <img
            src={user?.image?.imageUrl}
            className="w-fit h-full object-contain rounded-xl"
          ></img>
        </div>
      )}
      {user?.isLoggedIn && (
        <FaRegEdit
          className="absolute bottom-4 right-4 text-3xl bg-brand-third rounded-lg text-brand-primary cursor-pointer p-1"
          onClick={() => {
            dispatch(modalActions.toggleModal("profileImageEdit"));
          }}
        />
      )}
    </>
  );
};

export default ProfileImage;
