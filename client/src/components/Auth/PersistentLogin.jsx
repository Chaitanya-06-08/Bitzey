import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import requestAccessTokenRefresh from "../../util/requestAccessTokenRefresh";
import { getState } from "../../util/getState";
import { useDispatch } from "react-redux";
const PersistentLogin = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let dispatch = useDispatch();
  const user = getState("user");
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      await requestAccessTokenRefresh(
        user,
        location,
        navigate,
        dispatch,
        location.pathname
      );
    };
    console.log("in persist login");
    checkIfLoggedIn();
  }, []);
  let { isLoggedIn } = user;
  useEffect(() => {
    if (isLoggedIn) {
      if (user.usertype == "restaurant") {
        let path="/restaurant/dashboard"
        if (location.pathname.split('/')[1]=='restaurant')
        path=location.pathname 
        navigate(path,{replace:true});
      } else {
        let path=location?.pathname||'/'
        navigate(path,{replace:true,state:{from :path}});
      }
    }
  }, [isLoggedIn]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default PersistentLogin;
