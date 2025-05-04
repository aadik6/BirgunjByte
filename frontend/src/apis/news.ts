import { BASE_URL } from "@/config/axios";
import { NewsFormValue } from "@/schema";
import axios from "axios";

export async function getAllNews() {
    const url = "news/get"
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data
}

export async function createNews(data: NewsFormValue) {
    const url = "news/create"
    const response = await axios.post(`${BASE_URL}${url}`, data)
    return response
}

export async function getNewsById(id: string) {
    const url = `news/get/${id}`;
    const res = await axios.get(`${BASE_URL}${url}`);
    return res.data;
}

export async function deleteNews(id: string) {
    const url = `news/delete/${id}`;
    const res = await axios.delete(`${BASE_URL}${url}`);
    return res;
}

export async function updateNews(id:string,data:NewsFormValue){
    const url = `news/update/${id}`;
    const res = await axios.patch(`${BASE_URL}${url}`,data);
    return res.data;
}

export async function getFeaturedNews(){
    const url = "news/featured"
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data
}

export async function getMostViewed(){
    const url = "news/mostviewed"
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data
}

export async function getNewsByCategory(category: string) {
    const url = `news/category/${category}`;
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data;
}