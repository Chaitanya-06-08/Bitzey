import axios from "axios";

const instance = axios.create({
  baseURL: "https://bitzey.onrender.com",
  withCredentials: true,
});
export default instance;
export const baseURL = "https://bitzey.onrender.com";
