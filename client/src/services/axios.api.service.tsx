import axios from "axios";
import {baseUrl} from "../costants/Urls";
import {tokkenKey} from "../costants/tokkenKey";

export const axiosInstanse = axios.create({
    baseURL: baseUrl,
    headers: {}
})

axiosInstanse.interceptors.request.use(request => {
    request.headers.set('Authorization', 'Bearer ' + tokkenKey)
    return request
})