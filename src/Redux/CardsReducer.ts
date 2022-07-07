import {CardsApi, CardsParamsType, cardType} from "../api/cards-api";
import {AppThunk} from "./Store";
import {Dispatch} from "redux";

export type InitialStateType = {
    cards: cardType[],
    page:number,
    pageCount:number,
    cardsTotalCount:number,
}

const initialState: InitialStateType = {
    cards:[],
    page:0,
    pageCount:0,
    cardsTotalCount:0,
}

export const CardsReduser = (state: InitialStateType = initialState, action: CardsActionSType): InitialStateType => {
    switch (action.type) {
        case "cards/ADD-CARDS":
            return {...state, cards:action.payload.data, page:action.payload.page, pageCount:action.payload.pageCount, cardsTotalCount:action.payload.cardsTotalCount}
        default:
            return {...state}
    }
}

export const setCardsAC = (data:cardType[],page:number, pageCount:number,cardsTotalCount:number ) =>
    ({
        type: 'cards/ADD-CARDS',
        payload: {
            data,
            page,
            pageCount,
            cardsTotalCount

        }
    } as const)

type setMessageAType = ReturnType<typeof setCardsAC>

type CardsActionSType = setMessageAType

export const setCardsTC = (data: CardsParamsType): AppThunk => (dispatch: Dispatch) => {
    CardsApi.getCards(data)
        .then(response => {
            debugger
            dispatch(setCardsAC(response.data.cards, response.data.page, response.data.pageCount, response.data.cardsTotalCount))
        })
        .catch(() => {
        })
}