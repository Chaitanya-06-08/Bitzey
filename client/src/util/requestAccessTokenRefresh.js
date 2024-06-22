import axios from "axios";
import { userActions } from "../store/User";
import { restaurantActions } from "../store/Restaurant";
const requestAccessTokenRefresh = async (
  user,
  location,
  navigate,
  dispatch,
  path
) => {
  try {
    // console.log(("Access Token before\n", user.accessToken));
    const response = await axios.post(
      "/api/refreshAccessToken",
      {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        email: user.email || localStorage.getItem("email"),
      },
      { withCredentials: true }
    );
    // console.log("After refersh:\n", response.data.accessToken);
    // console.log(response.data);
    dispatch(userActions.setAccessToken(response.data.accessToken));
    dispatch(userActions.setRefreshToken(response.data.refreshToken));
    let {
      _id,
      username,
      email,
      imageUrl,
      usertype,
      favouriteRestaurants,
      favouriteFoodItems,
    } = response.data?.user;
    dispatch(
      userActions.setUser({
        _id,
        username,
        email,
        imageUrl,
        usertype,
        isLoggedIn: true,
      })
    );
    dispatch(userActions.setFavouriteFooditems(favouriteFoodItems));
    dispatch(userActions.setFavouriteRestaurants(favouriteRestaurants));
    if (usertype == "restaurant") {
      // console.log(response.data.restaurant);
      let { _id, user_id, name, imageUrl, location } =
        response.data?.restaurant;
      dispatch(
        restaurantActions.setRestaurantInfo({
          restaurant_id: _id,
          user_id,
          name,
          imageUrl,
          location,
        })
      );
    }
  } catch (error) {
    console.log(error);
    let endpoint = path || `/auth/login/${user.usertype}`;
    navigate(`${endpoint}`, {
      state: { from: location.pathname },
    });
  }
};
export default requestAccessTokenRefresh;
