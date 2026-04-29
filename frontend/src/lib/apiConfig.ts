import axios from 'axios'
import {refreshToken} from "../services/auth.services";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})

let refreshingToken = false;


api.interceptors.response.use(
    (response) => response,

    async(error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){

            originalRequest._retry = true;

            if(refreshingToken){
                await new Promise(res => setTimeout(res,1000));
                return api(originalRequest);
            }
            refreshingToken = true;
            try{
                await refreshToken();
                refreshingToken = false;
                window.location.href = "/login";
            }catch (err) {
                refreshingToken = false;
                window.location.href = "/login";
                return Promise.reject(err);
            }

        }
        return Promise.reject(error);
    }
)