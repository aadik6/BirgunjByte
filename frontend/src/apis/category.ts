
import { BASE_URL } from "@/config/axios";
import { CategoryFormValue } from "@/schema";
// import { CategoryData } from "@/types/columnTypes";
import axios from 'axios';

export async function getCategories() {
    const url = "category/getAll"
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data
}

export async function createCategory(data: CategoryFormValue) {
    const url = "category/create"
    const response = await axios.post(`${BASE_URL}${url}`, data)
    return response

}

export async function deleteCategory(id: string) {
    const url = (`category/delete/${id}`);
    const response = await axios.delete(`${BASE_URL}${url}`);
    return response
}

export async function updateCategory(id: string, data: CategoryFormValue) {
    const url = (`category/update/${id}`);
    const response = await axios.patch(`${BASE_URL}${url}`,data)
    return response
}
