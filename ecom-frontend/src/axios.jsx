import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  // Add any request interceptors if needed
  return config;
}, (error) => {
  return Promise.reject(error);
});

API.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error("API Error:", error);
  return Promise.reject(error);
});

export default API;
