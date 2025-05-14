import { userData } from "@/types/userTypes";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

const devUrl = import.meta.env.VITE_DEV_URL ;
const prodUrl = import.meta.env.VITE_PROD_URL;

export const BASE_URL = import.meta.env.MODE==="production" ? prodUrl : devUrl;

export const customAxios = axios.create({
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
        async (config) => {
            const token = getToken && getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        }, (error) => Promise.reject(error)
    )
    customAxios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalReq = error.config
            if (error.response.status === 401 && !originalReq._retry) {
                originalReq._retry = true
                try {
                    const res = await customAxios.get('/auth/refresh')
                    const { accessToken } = res.data
                    setToken(accessToken)
                    const decodedToken = jwtDecode<JwtPayload & { user: userData }>(accessToken);
                    const decodedUser = decodedToken.user;
                    updateUser(decodedUser)
                    if (originalReq.headers) {
                        originalReq.headers.Authorization = `Bearer ${accessToken}`
                    }
                    return customAxios(originalReq)
                } catch (error) {
                    return Promise.reject(error)
                }
            }
            return Promise.reject(error);
        }
    )
};

