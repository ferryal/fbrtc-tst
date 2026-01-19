import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging in development
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `[API Error] ${error.response.status}: ${error.response.statusText}`,
      );
    } else if (error.request) {
      console.error("[API Error] No response received");
    } else {
      console.error("[API Error]", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
