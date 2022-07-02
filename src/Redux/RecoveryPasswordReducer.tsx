import { Dispatch } from "redux"
import {recoveryApi} from "../api/recovery-api";

export type InitialStateType = {
    info: string
    error: string
    isLoading: boolean
}

const initialState: InitialStateType = {
    info: '',
    error: '',
    isLoading: false
}

export const RecoveryPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_RECOVERY_INFO':
            return {...state, info: action.info, error: ''}
        case 'SET_ERROR': 
            return {...state, error: action.error}
        case 'CHANGE_IS_LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return {...state}
    }
}

export const recoveryPasswordAC = (info: string): recoveryPasswordACType => ({
    type: 'SET_RECOVERY_INFO',
    info,
} as const);

export const setErrorAC = (error: string): setErrorACType => ({
    type: 'SET_ERROR',
    error,
} as const);

export const changeIsLoading = (isLoading: boolean): changeIsLoadingACType => ({
    type: 'CHANGE_IS_LOADING',
    isLoading,
} as const);

export const recoveryPasswordTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(changeIsLoading(true));
    recoveryApi.recoveryPassword(email)
        .then(res => {
            console.log(res);
            dispatch(recoveryPasswordAC(res.info));
            dispatch(changeIsLoading(false));
        })
        .catch(error => {
            dispatch(changeIsLoading(false));
            dispatch(setErrorAC(error.response.data.error));
            setTimeout(() => {
                dispatch(setErrorAC(''))
            }, 2000);
        })
}

export type recoveryPasswordACType = {
    type: 'SET_RECOVERY_INFO',
    info: string
}

export type setErrorACType = {
    type: 'SET_ERROR',
    error: string
}

export type changeIsLoadingACType = {
    type: 'CHANGE_IS_LOADING',
    isLoading: boolean
}

export type ActionsType = recoveryPasswordACType | setErrorACType | changeIsLoadingACType;
