import {CardsApi, CardsParamsType, cardType} from "../api/cards-api";
import {AppThunk} from "./Store";
import {Dispatch} from "redux";
import {AuthMeTC} from "./LoginReducer";

export type InitialStateType = {
    cards: cardType[],
    page:number,
    pageCount:number,
    cardsTotalCount:number,
    namePack: string
}

const initialState: InitialStateType = {
    cards:[],
    page:0,
    pageCount:0,
    cardsTotalCount:0,
    namePack: ''
}

export const CardsReduser = (state: InitialStateType = initialState, action: CardsActionSType): InitialStateType => {
    switch (action.type) {
        case "cards/ADD-CARDS":
            return {...state, cards:action.payload.data, page:action.payload.page, pageCount:action.payload.pageCount, cardsTotalCount:action.payload.cardsTotalCount}
        case "cards/CHANGE-CARD-EDIT-STATUS":
            return {...state, cards: state.cards.map((card): cardType => card._id === action.cardId ? {...card, isEditCard: !card.isEditCard} : card)}
        case "cards/CLEAR-CARDS":
            return {...state, cards: [], namePack: '', pageCount:0, page:0}
        case "cards/ADD-NAME-PACK":
            return {...state, namePack: action.payload.name}
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

export const clearCardsAC = () =>
    ({
        type: 'cards/CLEAR-CARDS',
    } as const)

export const addNamePackAC = (name: string) =>
    ({
        type: 'cards/ADD-NAME-PACK',
        payload: {
            name
        }
    } as const)

export const changeCardEditStatus = (cardId: string): changeCardEditStatusType => ({
    type: 'cards/CHANGE-CARD-EDIT-STATUS',
    cardId
} as const)

type setCardsAСType = ReturnType<typeof setCardsAC>

type addNamePackACType = ReturnType<typeof addNamePackAC>

type clearCardsACType = ReturnType<typeof clearCardsAC>

type changeCardEditStatusType = {
    type: 'cards/CHANGE-CARD-EDIT-STATUS',
    cardId: string
}

type CardsActionSType = setCardsAСType | changeCardEditStatusType | addNamePackACType | clearCardsACType

export const setCardsTC = (data: CardsParamsType): AppThunk => (dispatch: Dispatch) => {
    CardsApi.getCards(data)
        .then(response => {
            dispatch(setCardsAC(response.data.cards, response.data.page, response.data.pageCount, response.data.cardsTotalCount))
        })
        .catch(() => {
        })
}

export const clearCardsTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(clearCardsAC())
}