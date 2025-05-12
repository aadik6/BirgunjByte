import { BASE_URL, customAxios } from "@/config/axios";
import axios from "axios";

export async function authLogin(email: string, password: string) {
  const response = await axios.post(`${BASE_URL}auth/login`, {
    email,
    password,
  });
  return response.data;
}