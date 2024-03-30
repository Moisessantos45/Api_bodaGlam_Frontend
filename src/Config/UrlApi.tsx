import axios from "axios";

const UrlApi = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_API}/api/1.0/`,
});

export default UrlApi;
