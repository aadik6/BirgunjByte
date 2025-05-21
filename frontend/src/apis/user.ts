import { customAxios } from "@/config/axios";
import { userData } from "@/types/userTypes";

export async function authLogin(email: string, password: string) {
  const response = await customAxios.post(`auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function getRefreshToken() {
  const response = await customAxios.get(`auth/refresh`);
  return response;
}

export async function authLogout() {
  const response = await customAxios.post(`auth/logout`);
  return response;
}
export async function getUsers() {
  const response = await customAxios.get(`auth/users`);
  return response.data;
}

export async function addUser(data:userData) {
  const response = await customAxios.post(`auth/adduser`, data);
  return response.data;
}