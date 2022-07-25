import  {AxiosResponse} from 'axios'
import {instance} from "./axiosConf";

export type LoginParamsType = {
    email: string;
    password:string;
    rememberMe:boolean
}

type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

export const LoginApi = {
    login(data: LoginParamsType){
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', data);
    },
    logout(){
        return instance.delete('/auth/me');
    },
    authMe(){
        return instance.post('/auth/me', {});
    },
    changeAvatar(avatar: string){
        return instance.put('/auth/me', {
            avatar,
        })
    }
}