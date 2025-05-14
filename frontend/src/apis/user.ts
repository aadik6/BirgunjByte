import { customAxios } from "@/config/axios";

export async function authLogin(email: string, password: string) {
  const response = await customAxios.post(`auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function getRefreshToken() {
  const response = await customAxios.get(`auth/refresh`);
  return response.data;
}