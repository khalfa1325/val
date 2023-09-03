import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query"
import axios from "axios"


export const axiosInstance=axios.create({
    baseURL:'http://localhost:5000'
})


export const QueryUrl=fetchBaseQuery({
    baseUrl:'http://localhost:5000'
})