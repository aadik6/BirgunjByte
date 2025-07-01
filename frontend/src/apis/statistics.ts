import { BASE_URL } from "@/config/axios";
import axios from "axios";


export async function getStatistics() {
    const url = "statistics/total";
    const res = await axios.get(`${BASE_URL}${url}`);
    return res.data;
}