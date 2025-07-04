import { userData } from "@/types/userTypes";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

const devUrl = import.meta.env.VITE_DEV_URL;
const prodUrl = import.meta.env.VITE_PROD_URL;

export const BASE_URL = import.meta.env.MODE === "production" ? prodUrl : devUrl;

// Main axios instance for your app
export const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Separate instance for refresh token requests (no interceptors)
const refreshAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const setupInterceptors = (
  getToken: () => string | null,
  setToken: (token: string) => void,
  updateUser: (user: userData) => void
): void => {
  customAxios.interceptors.request.use(
    (config) => {
      const token = getToken && getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalReq = error.config;
      if (
        error.response?.status === 401 &&
        !originalReq._retry
      ) {
        originalReq._retry = true;
        try {
          // Use refreshAxios to avoid infinite interceptor loop
          const res = await refreshAxios.get("/auth/refresh");
          if (res.status !== 200) {
            return Promise.reject(error);
          }
          const { accessToken } = res.data;
          setToken(accessToken);
          const decodedToken = jwtDecode<JwtPayload & { user: userData }>(accessToken);
          const decodedUser = decodedToken.user;
          updateUser(decodedUser);
          if (originalReq.headers) {
            originalReq.headers.Authorization = `Bearer ${accessToken}`;
          }
          return customAxios(originalReq);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};