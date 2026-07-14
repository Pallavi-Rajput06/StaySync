import axios from "axios";

const getApiBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  return import.meta.env.DEV ? "/api" : "http://localhost:5000/api";
};

const API = axios.create({
  baseURL: getApiBaseURL(),
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;