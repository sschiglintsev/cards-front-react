export type InitialStateType = {
}

const initialState: InitialStateType = {

}

export const ProfileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

