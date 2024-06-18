import { createSlice } from "@reduxjs/toolkit";

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurant_id: "",
    user_id: "",
    name: "",
    imageUrl: "",
    location: "",
  },
  reducers: {
    setRestaurantInfo(state, action) {
      let { restaurant_id, user_id, name, imageUrl, location } = action.payload;
      return { restaurant_id, user_id, name, imageUrl, location };
    },
  },
});

export const restaurantActions = restaurantSlice.actions;
