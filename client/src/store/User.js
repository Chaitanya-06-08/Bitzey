import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    username: "",
    email: "",
    imageUrl: "",
    accessToken: "",
    refreshToken: "",
    usertype: "",
    isLoggedIn: false,
    favouriteRestaurants: [],
    favouriteFoodItems: [],
  },
  reducers: {
    setUser(state, action) {
      let { _id, username, email, imageUrl, usertype, isLoggedIn } =
        action.payload;
      return {
        ...state,
        _id: _id,
        username: username,
        email: email,
        imageUrl: imageUrl,
        usertype: usertype,
        isLoggedIn: isLoggedIn,
      };
    },
    setAccessToken(state, action) {
      return { ...state, accessToken: action.payload };
    },
    setRefreshToken(state, action) {
      return { ...state, refreshToken: action.payload };
    },
    setFavouriteFooditems(state, action) {
      state.favouriteFoodItems = action.payload;
      return state;
    },
    setFavouriteRestaurants(state, action) {
      state.favouriteRestaurants = action.payload;
      return state;
    },
    addToFavouriteRestaurants(state, action) {
      state.favouriteRestaurants.push(action.payload);
      return state;
    },
    addToFavouriteFoodItems(state, action) {
      state.favouriteFoodItems.push(action.payload);
      return state;
    },
    removeFromFavouriteRestaurants(state, action) {
      state.favouriteRestaurants = state.favouriteRestaurants.filter(
        (restaurant_id) => restaurant_id != action.payload
      );
      return state
    },
    removeFromFavouriteFoodItems(state, action) {
      state.favouriteFoodItems = state.favouriteFoodItems.filter(
        (menuitem_id) => menuitem_id != action.payload
      );
      return state
    },
  },
});

export const userActions = userSlice.actions;
