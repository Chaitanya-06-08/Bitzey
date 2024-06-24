import { createSlice } from "@reduxjs/toolkit";

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurant_id: "",
    user_id: "",
    name: "",
    image: {
      imageUrl: "",
      public_id: "",
    },
    location: "",
  },
  reducers: {
    setRestaurantInfo(state, action) {
      let { restaurant_id, user_id, name, image, location } = action.payload;
      return { restaurant_id, user_id, name, image, location };
    },
  },
});

export const restaurantActions = restaurantSlice.actions;
