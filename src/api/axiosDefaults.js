import axios from "axios";

// Code form CI "Moments" walkthrough project
axios.defaults.baseURL = "https://pp5-devise-api.herokuapp.com"
axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();