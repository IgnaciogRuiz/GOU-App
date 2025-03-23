import axios from "axios";

const API_URL = "http://tu-api.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Necesario si usas Laravel Sanctum con cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
