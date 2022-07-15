import {CardsApi, CardsParamsType, cardType} from "../api/cards-api";
import {AppThunk} from "./Store";
import {Dispatch} from "redux";
import {setIsLoadingAC, setMessageAC} from "./AppReducer";

export type InitialStateType = {
    cards: cardType[],
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    namePack: string
}

const initialState: InitialStateType = {
    cards: [],
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0,
    namePack: ''
}

export const CardsReduser = (state: InitialStateType = initialState, action: CardsActionSType): InitialStateType => {
    switch (action.type) {
        case "cards/ADD-CARDS":
            return {
                ...state,
                cards: action.payload.data,
                page: action.payload.page,
                pageCount: action.payload.pageCount,
                cardsTotalCount: action.payload.cardsTotalCount
            }
        case "cards/CHANGE-CARD-EDIT-STATUS":
            return {
                ...state,
                cards: state.cards.map((card): cardType => card._id === action.cardId ? {
                    ...card,
                    isEditCard: !card.isEditCard
                } : card)
            }
        case "cards/EDIT-CARD":
            return {
                ...state,
                cards: state.cards.map((card): cardType => card._id === action.payload.id
                    ? {
                        ...card,
                        question: action.payload.questionValue, answer: action.payload.answerValue,
                    }
                    : card)
            }

        case "cards/CLEAR-CARDS":
            return {...state, cards: [], namePack: '', pageCount: 0, page: 0}
        case "cards/ADD-NAME-PACK":
            return {...state, namePack: action.payload.name}
        default:
            return {...state}
    }
}

export const setCardsAC = (data: cardType[], page: number, pageCount: number, cardsTotalCount: number) =>
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

export const editCardAC = (id: string, questionValue: string, answerValue: string) => ({
    type: 'cards/EDIT-CARD',
    payload: {
        id,
        questionValue,
        answerValue
    }
} as const)

type setCardsAСType = ReturnType<typeof setCardsAC>

type addNamePackACType = ReturnType<typeof addNamePackAC>

type clearCardsACType = ReturnType<typeof clearCardsAC>

type editCardACType = ReturnType<typeof editCardAC>


type changeCardEditStatusType = {
    type: 'cards/CHANGE-CARD-EDIT-STATUS',
    cardId: string
}

type CardsActionSType =
    setCardsAСType
    | changeCardEditStatusType
    | addNamePackACType
    | clearCardsACType
    | editCardACType

export const setCardsTC = (data: CardsParamsType): AppThunk => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true))
    CardsApi.getCards(data)
        .then(response => {
            dispatch(setCardsAC(response.data.cards, response.data.page, response.data.pageCount, response.data.cardsTotalCount))
        })
        .catch((error: any) => {
            dispatch(setMessageAC(error.message, true))
        })
        .finally(() => {
            dispatch(setIsLoadingAC(false))
        })
}

export const clearCardsTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(clearCardsAC())
}

export const deleteCardTC = (id: string): AppThunk => async (dispatch: Dispatch) => {
    try {
        await CardsApi.deleteCard(id);
    } catch (error: any) {
        dispatch(setMessageAC(error.message, true))
    }
}

export const editCardTC = (id: string, questionValue: string, answerValue: string): AppThunk => async (dispatch: Dispatch) => {
    try {
        await CardsApi.editCard({
            _id: id,
            question: questionValue,
            answer: answerValue,
        })
        dispatch(editCardAC(id, questionValue, answerValue))
    } catch (error: any) {
        dispatch(setMessageAC(error.message, true))
    }
}
