import { setMessageAC } from "./AppReducer"
import { AppThunk } from "./Store"
import {accountAPI} from "../api/registration-api";

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
        if(!result.data.error) {
            dispatch(setIsRegisteredAC(true))
        } 
    })
    .catch((error) => {        
        dispatch(setMessageAC(error.response.data.error, true))
    })
}

export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'REGISTRATION/SET-IS-REGISTERED', isRegistered} as const)

export type SetIsRegisteredActionType = ReturnType<typeof setIsRegisteredAC>

export const setRegistrationErrorAC = (error: string) => ({type: 'REGISTRATION/SET-ERROR', error} as const)

export type SetErrorActionType = ReturnType<typeof setRegistrationErrorAC>


export type RegistrationActionType = SetIsRegisteredActionType | SetErrorActionType;
