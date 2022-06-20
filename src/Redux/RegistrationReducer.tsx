export type InitialStateType = {
}

const initialState: InitialStateType = {

}

export const RegistrationReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}


// export const initializeAppTC = () => (dispatch: Dispatch) => {
//
// }

// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
//
//
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
//
//
// type ActionsType =
//     | SetAppErrorActionType
