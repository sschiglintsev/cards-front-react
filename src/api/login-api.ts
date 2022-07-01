import axios, {AxiosResponse} from 'axios'

export type LoginParamsType = {
    email: string;
    password:string;
    rememberMe:boolean
}

type ResponseType = {
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

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const LoginApi = {
    login(data: LoginParamsType){
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', data);
    },
    logout(){
        return instance.delete('/auth/me')
    }
}