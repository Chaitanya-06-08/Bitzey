import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    imageUrl: "",
    accessToken: "",
    refreshToken: "",
    usertype: "",
    isLoggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      let { username, email, imageUrl, usertype, isLoggedIn } = action.payload;
      return {
        ...state,
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
  },
});

export const userActions = userSlice.actions;
