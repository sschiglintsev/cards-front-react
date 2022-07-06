import { AppThunk } from "./Store"
import { packsAPI } from './../api/packs-api';
import { number } from "yup";

export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type InitialStateType = {
    packs: PackType[]
    minMax: number[]
}

const initialState: InitialStateType = {
    packs: [],
    minMax: []
}

export const ProfileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/Get-Packs': {
            return { ...state, packs: action.packs }
        }
        case 'PROFILE/Set-MinMax': {
            console.log(action.value);
            
            return {...state, minMax: action.value}
        }
        default:
            return { ...state }
    }
}


export const getPacksTC = (page: number): AppThunk => async (dispatch, getState) => {
    try {
        let state = getState();
        let data = {
        packName: "", // не обязательно 
        min: state.profile.minMax[0], // не обязательно 
        max: state.profile.minMax[1], // не обязательно 
        sortPacks: "",// не обязательно 
        page: page, // не обязательно 
        pageCount: 8, // не обязательно 
        user_id: state.login.,
    }
        let result = await packsAPI.getPacks(data);
        console.log(result.data.cardPacks);
        dispatch(GetPacksAC(result.data.cardPacks));
    } catch (error) {

    }

}

export const GetPacksAC = (packs: PackType[]) => ({ type: 'PROFILE/Get-Packs', packs } as const)


export type GetPacksActionType = ReturnType<typeof GetPacksAC>

export const SetMinMaxAC = (value: number[]) => ({ type: 'PROFILE/Set-MinMax', value } as const)


export type SetMinMaxActionType = ReturnType<typeof SetMinMaxAC>


export type ProfileActionsType =
    GetPacksActionType | SetMinMaxActionType;
