import {CardsApi, CardsParamsType, cardType} from "../api/cards-api";
import {AppThunk} from "./Store";
import {Dispatch} from "redux";

export type InitialStateType = {
    cards: cardType[]
}

const initialState: InitialStateType = {
    cards:[]
}

export const CardsReduser = (state: InitialStateType = initialState, action: CardsActionSType): InitialStateType => {
    switch (action.type) {
        case "cards/ADD-CARDS":
            return {...state, cards:action.payload.data}
        default:
            return {...state}
    }
}

export const setCardsAC = (data:cardType[]) =>
    ({
        type: 'cards/ADD-CARDS',
        payload: {
            data
        }
    } as const)

type setMessageAType = ReturnType<typeof setCardsAC>

type CardsActionSType = setMessageAType

export const setCardsTC = (data: CardsParamsType): AppThunk => (dispatch: Dispatch) => {
    CardsApi.getCards(data)
        .then(response => {
            dispatch(setCardsAC(response.data.cards))
        })
        .catch(() => {
        })
}