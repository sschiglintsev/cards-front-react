import { Dispatch } from "redux"
import { accountAPI } from "../api/app-api"
import { AppThunk } from "./Store"



const initialState: InitialStateType = {
    isRegistered: false,
    error: null
}

export type InitialStateType = {
    isRegistered: boolean,
    error: string | null
} 

export const RegistrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SET-IS-REGISTERED": {
            return {...state, isRegistered: action.isRegistered}
        }
        case "REGISTRATION/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}

export type RegisterValuesType = {
    email: string,
    password: string
}

export const registerUserTC = (values: RegisterValuesType): AppThunk => (dispatch) => {
    accountAPI.register(values)
    .then((result) => {
        console.log(result);
        if(!result.data.error) {
            dispatch(setIsRegisteredAC(true))
        } 
    })
    .catch((error) => {
        console.log(error.response.data.error);
        
        dispatch(setRegistrationErrorAC(error.response.data.error))
    })
}

export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'REGISTRATION/SET-IS-REGISTERED', isRegistered} as const)

export type SetIsRegisteredActionType = ReturnType<typeof setIsRegisteredAC>

export const setRegistrationErrorAC = (error: string) => ({type: 'REGISTRATION/SET-ERROR', error} as const)

export type SetErrorActionType = ReturnType<typeof setRegistrationErrorAC>


export type RegistrationActionType = SetIsRegisteredActionType | SetErrorActionType;
