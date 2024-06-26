import React from "react";
import ProfileImage from "./ProfileImage";
import { getState } from "../util/getState";

const Profile = () => {
  const user = getState("user");
  const showSidebar = getState("sidebar");
  return (
    <div
      className={`${
        showSidebar ? "max-w-[70%]" : "max-w-[50%]"
      } flex flex-col space-y-2 mx-auto`}
    >
      <h1 className="text-xl text-brand-primary w-full border-b-2 border-b-gray-200 py-2 font-bold">
        Profile
      </h1>
      <div className="my-6 rounded-xl bg-brand-primary shadow-xl flex space-y-4 font-brandFont py-4">
        <div className="flex flex-col items-center justify-center p-4 relative w-1/4">
          <ProfileImage />
        </div>
        <div className="w-3/4 rounded-md bg-white text-brand-primary mx-4 p-4 divide-y-2">
          <div className="flex flex-col">
            <p className="text-md font-semibold">Your Username</p>
            <div className="flex items-center justify-between py-1">
              <p className="font-bold">{user.username}</p>
              <button className="btn-primary">Edit</button>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-md font-semibold">Your Email</p>
            <div className="flex items-center justify-between py-1">
              <p className="font-bold">{user.email}</p>
              <button className="btn-primary">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
