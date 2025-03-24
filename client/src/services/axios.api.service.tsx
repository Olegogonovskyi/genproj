import axios from "axios";
import {baseUrl} from "../costants/Urls";
import { tokenKey } from '../costants/keysToLockalStorage';

export const axiosInstanse = axios.create({
    baseURL: baseUrl,
    headers: {}
})

axiosInstanse.interceptors.request.use(request => {

    const accessToken = localStorage.getItem(tokenKey)
    request.headers.set('Authorization', 'Bearer ' + accessToken)
    return request
})