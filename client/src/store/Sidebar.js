import { createSlice } from "@reduxjs/toolkit";
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: false,
  reducers: {
    toggleSideBar(state) {
      return !state;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
