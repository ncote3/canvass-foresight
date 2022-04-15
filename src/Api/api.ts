import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 1000,
  headers: {
    "xc-auth": process.env.REACT_APP_API_KEY as string,
  },
});

export default API;
