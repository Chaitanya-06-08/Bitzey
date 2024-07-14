import axios from "../util/axios";
import requestAccessTokenRefresh from "./requestAccessTokenRefresh";
import { userActions } from "../store/User";
import toast from "react-hot-toast";
export const markRestaurantAsfavourite = async (
  _id,
  dispatch,
  user,
  navigate
) => {
  try {
    let response = await axios.post(
      `/api/markRestaurantAsFavourite`,
      { restaurant_id: _id, user_id: user._id },
      { withCredentials: true }
    );
    console.log(response.data);
    dispatch(userActions.addToFavouriteRestaurants(_id));
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
};
export const removeRestaurantFromFavourite = async (
  _id,
  dispatch,
  user,
  navigate
) => {
  try {
    let response = await axios.post(
      `/api/reomveRestaurantFromFavourite`,
      { restaurant_id: _id, user_id: user._id },
      { withCredentials: true }
    );
    console.log(response.data);
    dispatch(userActions.removeFromFavouriteRestaurants(_id));
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
};

export const markFoodItemAsfavourite = async (
  _id,
  dispatch,
  user,
  navigate
) => {
  try {
    let response = await axios.post(
      `/api/markFoodItemAsFavourite`,
      { menuitem_id: _id, user_id: user._id },
      { withCredentials: true }
    );
    console.log(response.data);
    dispatch(userActions.addToFavouriteFoodItems(_id));
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
};

export const removeFoodItemFromFavourite = async (
  _id,
  dispatch,
  user,
  navigate
) => {
  try {
    let response = await axios.post(
      `/api/removeFoodItemFromFavourite`,
      { menuitem_id: _id, user_id: user._id },
      { withCredentials: true }
    );
    console.log(response.data);
    dispatch(userActions.removeFromFavouriteFoodItems(_id));
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
};
