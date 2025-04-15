import axios from "axios";

const API_URL = "http://192.168.7.151/api";
const AUTH_URL = "http://192.168.7.151/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});