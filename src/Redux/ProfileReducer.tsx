import { AppThunk } from "./Store"
import { packsAPI } from './../api/packs-api';
import { number } from "yup";
import { setIsLoadingAC, setMessageAC } from "./AppReducer";

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
    totalCount: number
    packName: string
}

const initialState: InitialStateType = {
    packs: [],
    minMax: [1, 130],
    totalCount: 1,
    packName: ""
}

export const ProfileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/Get-Packs': {
            return { ...state, packs: action.packs, totalCount: action.totalCount }
        }
        case 'PROFILE/Set-MinMax': {
            console.log(action.value);

            return { ...state, minMax: action.value }
        }
        case 'PROFILE/Set-PackName': {

            return { ...state, packName: action.packName }
        }
        default:
            return { ...state }
    }
}


export const getPacksTC = (page: number, myPacks?: boolean): AppThunk => async (dispatch, getState) => {
    dispatch(setIsLoadingAC(true));
    try {
        let state = getState();
        let data = {
            packName: state.profile.packName,
            min: state.profile.minMax[0],
            max: state.profile.minMax[1] !== 0 ? state.profile.minMax[1] : 130,
            sortPacks: "",
            page: page,
            pageCount: 8,
            user_id: myPacks ? state.login._id : "",
        }
        let result = await packsAPI.getPacks(data);
        console.log(result.data.cardPacks);
        dispatch(GetPacksAC(result.data.cardPacks, result.data.cardPacksTotalCount));
        dispatch(setIsLoadingAC(false))
    } catch (error: any) {
        dispatch(setIsLoadingAC(false));
        dispatch(setMessageAC(error.response.data.error, true));
    }

}

export const addPackTC = (name: string = "New name", isPrivate: boolean = false): AppThunk => async (dispatch, getState) => {
    dispatch(setIsLoadingAC(true));
    try {
        let cardsPack = {
            name,
            deckCover: "",
            private: isPrivate
        }
        let result = await packsAPI.addPack(cardsPack);
        console.log(result);
        
        dispatch(getPacksTC(0, true));
        dispatch(setIsLoadingAC(false));
    } catch (error: any) {
        dispatch(setIsLoadingAC(false));
        dispatch(setMessageAC(error.response.data.error, true));
    }
}

export const GetPacksAC = (packs: PackType[], totalCount: number) => ({ type: 'PROFILE/Get-Packs', packs, totalCount } as const)


export type GetPacksActionType = ReturnType<typeof GetPacksAC>

export const SetMinMaxAC = (value: number[]) => ({ type: 'PROFILE/Set-MinMax', value } as const)


export type SetMinMaxActionType = ReturnType<typeof SetMinMaxAC>
export const SetPackNameAC = (packName: string) => ({ type: 'PROFILE/Set-PackName', packName } as const)


export type SetPackNameActionType = ReturnType<typeof SetPackNameAC>


export type ProfileActionsType =
    GetPacksActionType | SetMinMaxActionType | SetPackNameActionType;
