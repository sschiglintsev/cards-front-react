import {Dispatch} from "redux";
import {LoginApi, LoginParamsType} from "../api/login-api";
import {setIsLoadingAC, setMessageAC} from "./AppReducer";
import {AppThunk} from "./Store";

type InitialStateLoginType = {
    _id: string
    isLoggedIn: boolean,
    name: string,
    email: string,
    publicCardPacksCount: number,
    message: string,
    errorStatus: boolean,
    avatar?: string,
    isInitialize: boolean
}
const initialStateLogin: InitialStateLoginType = {
    _id: '',
    avatar: '',
    isLoggedIn: false,
    name: '',
    email: '',
    publicCardPacksCount: NaN,
    message: '',
    errorStatus: false,
    isInitialize: false,
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
        case 'login/SET-IS-INITIALIZE-IN':
            return {...state, isInitialize: !state.isInitialize}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setIsInitializeAC = () =>
    ({type: 'login/SET-IS-INITIALIZE-IN'} as const)

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

export const AuthMeTC = (): AppThunk => async (dispatch: Dispatch) => {

    try {
        dispatch(setIsLoadingAC(true))
        const response = await LoginApi.authMe()
        dispatch(setIsLoggedInAC(true))
        dispatch(setProfileAC(response.data._id, response.data.name, response.data.email, response.data.publicCardPacksCount, response.data.avatar))


    } catch (error: any) {
        dispatch(setMessageAC(error.message, true))
        console.log(error.message)
    } finally {
        dispatch(setIsLoadingAC(false))
        dispatch(setIsInitializeAC())
    }
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
export type setIsInitializeACType = ReturnType<typeof setIsInitializeAC>


export type LoginActionsType =
    setIsLoggedInACType
    | setProfileACType
    | logoutACType
    | setMessageACType
    | setIsInitializeACType
