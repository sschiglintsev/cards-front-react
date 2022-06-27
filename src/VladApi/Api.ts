import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const recoveryApi = {
    async setNewPassword(newPasswordData: NewPasswordData) {
        const res = await instance.post<ResponseData>('auth/set-new-password', newPasswordData);
        return res.data;
    },

    async recoveryPassword (recoveryData: RecoveryData) {
        const res = await instance.post<ResponseData>('auth/forgot', recoveryData);
        return res.data;
    },
    
};

interface RecoveryData {
    email: string
    message: string
}

interface NewPasswordData {
    password: string
    resetPasswordToken: string
}

interface ResponseData {
    info: string
    error: string
}