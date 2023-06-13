import axios from "axios"

const axios_instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default axios_instance