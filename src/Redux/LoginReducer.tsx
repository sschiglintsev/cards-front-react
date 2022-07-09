import {Dispatch} from "redux";
import {LoginApi, LoginParamsType} from "../api/login-api";
import { setMessageAC } from "./AppReducer";
import {AppThunk} from "./Store";

type InitialStateLoginType = {
    _id: string
    isLoggedIn: boolean,
    name: string,
    email: string,
    publicCardPacksCount: number,
    message: string,
    errorStatus: boolean
    avatar?: string
}
const initialStateLogin: InitialStateLoginType = {
    _id: '',
    avatar: '',
    isLoggedIn: false,
    name: '',
    email: '',
    publicCardPacksCount: NaN,
    message: '',
    errorStatus: false
}


export const LoginReducer = (state: InitialStateLoginType = initialStateLogin, action: LoginActionsType): InitialStateLoginType => {
    switch (action.type) {
        case "login/LOGOUT":
            return {...state, name: '', email: '', publicCardPacksCount: NaN, isLoggedIn: false}
        case "login/SET-PROFILE":
            return {
                ...state,
                _id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                publicCardPacksCount: action.payload.publicCardPacksCount,
                avatar: action.payload.avatar
            }
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setProfileAC = (_id: string, name: string, email: string, publicCardPacksCount: number, avatar: string = '') =>
    ({
        type: 'login/SET-PROFILE',
        payload: {
            _id,
            name,
            email,
            publicCardPacksCount,
            avatar
        }
    } as const)

export const LogoutAC = () =>
    ({
        type: 'login/LOGOUT',
    } as const)

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch: Dispatch) => {
    LoginApi.login(data)
        .then(response => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setProfileAC(response.data._id, response.data.name, response.data.email, response.data.publicCardPacksCount, response.data.avatar))
        })
        .catch((error) => {
            dispatch(setMessageAC(error.message, true))
            console.log(error.message)
        })
}

export const AuthMeTC = (): AppThunk => (dispatch: Dispatch) => {

    LoginApi.authMe()
        .then(response => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setProfileAC(response.data._id, response.data.name, response.data.email, response.data.publicCardPacksCount, response.data.avatar))
        })
        .catch((error) => {
            dispatch(setMessageAC(error.message, true))
            console.log(error.message)
        })
}

export const logoutTC = (): AppThunk => (dispatch: Dispatch) => {
    LoginApi.logout()
        .then(response => {
            dispatch(LogoutAC())
            dispatch(setMessageAC(response.data.info, false))
        })
}

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export type setProfileACType = ReturnType<typeof setProfileAC>
export type logoutACType = ReturnType<typeof LogoutAC>
export type setMessageACType = ReturnType<typeof setMessageAC>


export type LoginActionsType = setIsLoggedInACType | setProfileACType | logoutACType | setMessageACType
