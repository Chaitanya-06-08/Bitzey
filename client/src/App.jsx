import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import RestaurantMenu from "./pages/RestaurantMenu";
import Layout from "./components/Layout";
import Login from "./components/Auth/Login";
import Restaurants from "./pages/Restaurants";
import RestaurantPage from "./pages/RestaurantPage";
import CustomerSignup from "./components/Auth/CustomerSignup";
import { Toaster } from "react-hot-toast";
import RestaurantLogin from "./components/Auth/AddRestaurant";
import PreLogin from "./components/Auth/PreLogin";
import RestaurantSignup from "./components/Auth/RestaurantSignup";
import AdminLayout from "./components/Restaurant/Adminlayout";
import Dashboard from "./components/Restaurant/Dashboard";
import AddMenuItem from "./components/Restaurant/AddMenuItem";
import Menu from "./components/Restaurant/Menu";
import PersistentLogin from "./components/Auth/PersistentLogin";
import Orders from "./components/Orders";
import Favourites from "./pages/Favourites";
import RestaurantOrders from "./components/Restaurant/RestaurantOrders";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<PersistentLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="restaurants" element={<Restaurants />}></Route>
          <Route path="restaurantPage/:_id/" element={<RestaurantPage />}>
            <Route path="menu" element={<RestaurantMenu/>}></Route>
            <Route path="reviews"></Route>
          </Route>
          <Route path="orders" element={<Orders/>}></Route>
          <Route path="favourites" element={<Favourites/>}></Route>
        </Route>
        <Route path="/auth/">
          <Route
            path="partner-with-us-restaurant"
            element={<RestaurantLogin />}
          ></Route>
          <Route path="" index element={<PreLogin />}></Route>
          <Route path="login/">
            <Route path="customer" element={<Login />}></Route>
            <Route path="restaurant" element={<Login />}></Route>
          </Route>
          <Route path="signup/">
            <Route path="customer" element={<CustomerSignup />}></Route>
            <Route path="restaurant" element={<RestaurantSignup />}></Route>
          </Route>
        </Route>
        <Route path="/restaurant" element={<AdminLayout />}>
          <Route index path="dashboard" element={<Dashboard />}></Route>
          <Route path="orders" element={<RestaurantOrders/>}></Route>
          <Route path="addmenuitem" element={<AddMenuItem />}></Route>
          <Route path="menu/" element={<Menu />}>
            <Route path="editmenuitem"></Route>
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <Toaster position="top-center" containerStyle={{ top: 30 }} />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
