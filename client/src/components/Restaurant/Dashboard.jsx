import React, { useEffect, useState } from "react";
import { getState } from "../../util/getState";
import { TfiPackage } from "react-icons/tfi";
import { HiCurrencyRupee } from "react-icons/hi2";
import { MdRestaurantMenu } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import axios from "axios";
import requestAccessTokenRefresh from "../../util/requestAccessTokenRefresh";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/Loading";
import Loader from "../Loader";
import { motion } from "framer-motion";
import CategoryGraph from "./CategoryGraph";
import RevenueGraph from "./RevenueGraph";

const Dashboard = () => {
  const dispatch = useDispatch();
  const showLoading = getState("loading");
  const showSidebar = getState("sidebar");
  const restaurant = getState("restaurant");
  const user = getState("user");
  const [dashboardDetails, setDashboardDetails] = useState(null);
  useEffect(() => {
    const getDashboardDetails = async () => {
      dispatch(loadingActions.toggleLoading());
      try {
        let response = await axios.get(
          `/api/getDashboardDetails?_id=${
            restaurant.restaurant_id
          }&year=${new Date().getFullYear()}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setDashboardDetails(response.data.dashboardDetails);
      } catch (error) {
        console.log(error);
        if (error.response.status == 403 || error.response.status == 401) {
          await requestAccessTokenRefresh(
            user,
            location,
            navigate,
            dispatch,
            `/auth/login/${user.usertype}`
          );
        } else {
          toast.error(error?.response?.data?.message || error?.message);
        }
      } finally {
        dispatch(loadingActions.toggleLoading());
      }
    };
    if (user._id) getDashboardDetails();
  }, [user]);

  return (
    <>
      {showLoading && <Loader />}
      {!showLoading && dashboardDetails != null && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
          className={`${
            !showSidebar ? "max-w-[65%]" : ""
          } flex flex-col font-brandFont px-4 py-6 space-y-3 mx-auto max-w-[90%]`}
        >
          <h1 className="text-xl text-brand-primary w-full border-b-2 border-b-gray-200 py-2 font-bold">
            Dashboard
          </h1>
          <div className="grid grid-cols-4 gap-4">
            <DashboardCard
              title={"Total Revenue"}
              count={<span>&#8377;{dashboardDetails?.totalRevenue}</span>}
              icon={<HiCurrencyRupee />}
            />
            <DashboardCard
              title={"Orders"}
              count={dashboardDetails?.totalOrders}
              icon={<TfiPackage />}
            />
            <DashboardCard
              title={"Menu Items"}
              count={dashboardDetails?.totalMenuItems}
              icon={<MdRestaurantMenu />}
            />
            <DashboardCard
              title={"Customers"}
              count={dashboardDetails?.totalCustomers}
              icon={<HiUserGroup />}
            />
          </div>
          <div className="w-full flex space-x-2">
            <div className="flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 rounded-xl shadow-xl w-1/2 p-16">
              <CategoryGraph categoryData={dashboardDetails?.categoryData} />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 rounded-xl shadow-xl w-1/2 p-8">
              <RevenueGraph revenueData={dashboardDetails?.revenueData}/>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Dashboard;

const DashboardCard = ({ title, count, icon }) => {
  return (
    <div className="rounded-xl shadow-xl border-2 border-gray-200 p-2 w-full">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-xl overflow-x-hidden text-ellipsis max-w-40">
          {title}
        </p>
        <div className="text-2xl bg-brand-primary text-white p-2 rounded-full">
          {icon}
        </div>
      </div>
      <h1 className="text-xl text-brand-primary font-semibold pl-2">{count}</h1>
    </div>
  );
};
