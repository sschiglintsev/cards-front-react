type InitialAppStateType = {
    message: string,
    errorStatus: boolean,
    isLoading: boolean
}
const initialStateLogin: InitialAppStateType = {
    message: '',
    errorStatus: false,
    isLoading: false
}

export const AppReducer = (state: InitialAppStateType = initialStateLogin, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case "app/SET-MESSAGE":
            return {...state, message: action.message, errorStatus: action.errorStatus}
        case "app/SET-IS-LOADING":
            return {...state, isLoading: action.isLoading}
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

export const setIsLoadingAC = (isLoading: boolean) =>
    ({
        type: 'app/SET-IS-LOADING',
        isLoading
    } as const)

export type setIsLoadingACType = ReturnType<typeof setIsLoadingAC>


export type AppActionsType = setMessageACType | setIsLoadingACType;