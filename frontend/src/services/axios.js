import axios from "axios";

const getApiBaseURL = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  return import.meta.env.DEV ? "/api" : "https://staynest-backend.onrender.com/api";
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