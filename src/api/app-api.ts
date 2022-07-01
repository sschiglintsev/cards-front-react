import axios, { AxiosResponse } from "axios";
import { RegisterValuesType } from "../Redux/RegistrationReducer";


export const instance = axios.create({ 
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const accountAPI = {
    register(values: RegisterValuesType) {
        return instance.post<RegisterValuesType, AxiosResponse<RegisterResponseType>>(`/auth/register`, values);
    }
}

type RegisterResponseType = {
    addedUser: {
        
    },
    error?: string
}