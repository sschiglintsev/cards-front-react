import { AxiosResponse } from "axios";
import { RegisterValuesType } from "../Redux/RegistrationReducer";
import {instance} from "./axiosConf";

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