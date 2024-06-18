import { configureStore } from "@reduxjs/toolkit";
import { sidebarSlice } from "./Sidebar";
import { loadingSlice } from "./Loading";
import { userSlice } from "./User";
import { modalSlice } from "./Modal";
import { restaurantSlice } from "./Restaurant";
import { cartSlice } from "./Cart";
export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    restaurant: restaurantSlice.reducer,
    cart: cartSlice.reducer,
  },
});
