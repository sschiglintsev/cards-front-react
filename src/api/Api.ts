import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});

export const recoveryApi = {
    async setNewPassword(newPasswordData: NewPasswordData) {
        const res = await instance.post<ResponseData>('auth/set-new-password', newPasswordData);
        return res.data;
    },

    async recoveryPassword (email: string) {
        const data = {
            email,
            from: 'test-front-admin',
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='http://localhost:3000/#/new-password/$token$'>
            link</a>
            </div>`,
        }
        const res = await instance.post<ResponseData>('auth/forgot', data);
        return res.data; 
    },
    
};

export interface NewPasswordData {
    password: string
    resetPasswordToken: string
}

interface ResponseData {
    info: string
    error: string
}