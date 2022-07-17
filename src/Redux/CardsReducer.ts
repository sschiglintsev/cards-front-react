import {CardsApi, CardsGrade, CardsParamsType, cardType} from "../api/cards-api";
import {AppThunk} from "./Store";
import {Dispatch} from "redux";
import {setIsLoadingAC} from "./AppReducer";

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
        case "cards/CLEAR-CARDS":
            return {...state, cards: [], namePack: '', pageCount: 0, page: 0}
        case "cards/ADD-NAME-PACK":
            return {...state, namePack: action.payload.name}
        case "cards/SET-GRADE":
            return {...state, cards: state.cards.map((card) => card._id === action.cardId ? {...card, grade: action.grade} : card)}
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

export const setGradeAC = (grade: number, cardId: string) => ({
    type: 'cards/SET-GRADE',
    cardId,
    grade
} as const)

type setGradeACType = ReturnType<typeof setGradeAC>

type setCardsAСType = ReturnType<typeof setCardsAC>

type addNamePackACType = ReturnType<typeof addNamePackAC>

type clearCardsACType = ReturnType<typeof clearCardsAC>


type changeCardEditStatusType = {
    type: 'cards/CHANGE-CARD-EDIT-STATUS',
    cardId: string
}

type CardsActionSType =
    setCardsAСType
    | changeCardEditStatusType
    | addNamePackACType
    | clearCardsACType
    | setGradeACType

export const setCardsTC = (data: CardsParamsType): AppThunk => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true))
    CardsApi.getCards(data)
        .then(response => {
            dispatch(setCardsAC(response.data.cards, response.data.page, response.data.pageCount, response.data.cardsTotalCount))
        })
        .catch(() => {
        })
        .finally(() => {
            dispatch(setIsLoadingAC(false))
        })
}

export const getCardsTC = (id: string): AppThunk => async (dispatch, getState) => {
    dispatch(setIsLoadingAC(true))
    try {
        let data: CardsParamsType = {
            cardAnswer: undefined,
            cardQuestion: undefined, 
            cardsPack_id: id,
            min: 0,
            max: 5,
            sortCards: "0updated",
            page: 1,
            pageCount: undefined 
        }
        let result = await CardsApi.getAllCards(data);
        console.log("aaaaa", result.data);
        dispatch(clearCardsAC);
        dispatch(setCardsAC(result.data.cards, result.data.page, result.data.pageCount, result.data.pageCount))
        dispatch(setIsLoadingAC(false))
    } catch (error: any) {
        alert(error)
        dispatch(setIsLoadingAC(false))
    }
    
}
export const setGradeTC = (grade: number, card_id: string): AppThunk => async (dispatch, getState) => {
    dispatch(setIsLoadingAC(true))
    try {
        let data: CardsGrade = {
            grade,
            card_id
        }
        let result = await CardsApi.setGrade(data);
        console.log("grade", result.data);
        dispatch(setGradeAC(result.data.updatedGrade.grade, result.data.updatedGrade.card_id))
        dispatch(setIsLoadingAC(false))
    } catch (error: any) {
        alert(error)
        dispatch(setIsLoadingAC(false))
    }
    
}

export const clearCardsTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(clearCardsAC())
}
