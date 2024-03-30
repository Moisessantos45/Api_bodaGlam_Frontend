import axios from "axios";

const UrlApi = axios.create({
  baseURL: import.meta.env.VITE_HOST_API,
});
export default UrlApi;
