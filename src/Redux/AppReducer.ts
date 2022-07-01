import {AppThunk} from "./Store";

type InitialAppStateType = {
    message: string,
    errorStatus: boolean
}
const initialStateLogin: InitialAppStateType = {
    message: '',
    errorStatus: false
}

export const AppReducer = (state: InitialAppStateType = initialStateLogin, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case "app/SET-MESSAGE":
            return {...state, message: action.message, errorStatus: action.errorStatus}
        default:
            return {...state}
    }
}

// actions
export const setMessageAC = (message: string, errorStatus: boolean) =>
    ({
        type: 'app/SET-MESSAGE',
        message,
        errorStatus
    } as const)

export type setMessageACType = ReturnType<typeof setMessageAC>


export type AppActionsType = setMessageACType;