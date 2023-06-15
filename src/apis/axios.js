import axios from "axios"

const axios_instance = axios.create({

  baseURL: process.env.REACT_APP_BACKEND,
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
  withCredentials:true
});

export default axios_instance