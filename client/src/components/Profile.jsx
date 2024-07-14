import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { getState } from "../util/getState";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../util/axios";
import { useDispatch } from "react-redux";
import requestAccessTokenRefresh from "../util/requestAccessTokenRefresh";
import { loadingActions } from "../store/Loading";
import Loader from "../components/Loader";
import { userActions } from "../store/User";
const Profile = () => {
  const showSidebar = getState("sidebar");
  const showLoading = getState("loading");
  const [editEmail, setEditEmail] = useState(false);
  const user = getState("user");
  const [email, setEmail] = useState(user.email);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) setEmail(user.email);
  }, [user]);

  const onSaveButtonClick = async () => {
    if (!email.includes("@")) {
      toast.error("Email should be valid");
      setEmail(user.email);
    } else if (email == user.email) {
      setEditEmail((prev) => !prev);
      return;
    } else {
      dispatch(loadingActions.toggleLoading());
      try {
        let response = await axios.post(
          "/api/updateUserEmail",
          { username: user.username, email: email },
          { withCredentials: true }
        );
        dispatch(userActions.setUser({ ...user, email: email }));
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        if (error.response.status == 403 || error.response.status == 401) {
          await requestAccessTokenRefresh(
            user,
            location,
            navigate,
            dispatch,
            `/auth/login/customer`
          );
        } else {
          toast.error(error?.response?.data?.message || error?.message);
        }
      }
    }
    dispatch(loadingActions.toggleLoading());
    setEditEmail((prev) => !prev);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      {showLoading ? (
        <Loader />
      ) : (
        <>
          {user?.isLoggedIn ? (
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
                  <div className="flex flex-col py-2">
                    <p className="text-md font-semibold">Your Username</p>
                    <div className="flex items-center justify-between space-x-2">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className=" rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-brand-shade focus:border-brand-primary transition-all w-full cursor-not-allowed"
                        disabled
                        value={user.username}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    <p className="text-md font-semibold">Your Email</p>
                    <div className="flex items-center justify-between space-x-2">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className={`rounded-lg px-2 py-1 focus:outline-none focus:ring focus:ring-brand-shade focus:border-brand-primary transition-all w-full ${
                          editEmail ? "border-2 border-brand-primary" : ""
                        }`}
                        disabled={editEmail ? false : true}
                        value={email}
                        onChange={emailChangeHandler}
                      />
                      {!editEmail && (
                        <button
                          className="btn-primary"
                          onClick={() => {
                            setEditEmail((prev) => !prev);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      {editEmail && (
                        <button
                          className="btn-primary"
                          onClick={onSaveButtonClick}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col space-y-2 items-center justify-center">
              <div className="flex flex-col space-y-3 items-center p-6 rounded-xl">
                <h1 className=" text-2xl font-semibold text-brand-primary">
                  Looks like you are not logged in...
                </h1>
                <NavLink to="/auth/" className="btn-primary">
                  Login Now
                </NavLink>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
