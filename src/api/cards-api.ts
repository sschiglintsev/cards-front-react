import {AxiosResponse} from 'axios'
import {instance} from "./axiosConf";

export type CardsParamsType = {
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id?:string,
    min?: number,
    max?: number,
    sortCards?:string;
    page?:number,
    pageCount?:number
}

export type cardType = {
    "_id": string,
    "cardsPack_id": string,
    "user_id":string,
    "answer":string,
    "question": string,
    "grade": number,
    "shots": number,
    "comments": string,
    "type": string,
    "rating": number,
    "more_id": string,
    "created": string,
    "updated": string,
    "__v": number,
    "answerImg": string,
    "answerVideo": string,
    "questionImg": string,
    "questionVideo": string,
    "isEditCard": boolean,
}

export type NewCardType = {
    cardsPack_id?: string
    question: string
    answer: string
}

type ResponseType = {
"cards": cardType[],
    packUserId:string,
    page:number,
    pageCount:number,
    cardsTotalCount:number,
    minGrade:number,
    maxGrade:number,
    token:string,
    tokenDeathTime:number
}

export type CardsGrade = {
    grade: number,
    card_id: string
}


export const CardsApi = {
    getCards(data: CardsParamsType) {
        return instance.get<CardsParamsType, AxiosResponse<ResponseType>>('/cards/card' + '?cardsPack_id='+ data.cardsPack_id + '&page=' + data.page + '&cardAnswer=' +data.cardAnswer + '&cardQuestion=' +data.cardQuestion + '&sortCards=' +data.sortCards);
    },

    getAllCards(data: CardsParamsType) {
        return instance.get<CardsParamsType, AxiosResponse<ResponseType>>('/cards/card' + '?cardsPack_id='+ data.cardsPack_id + '&pageCount=' + 200);
    },

    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`);
    },

    createCard(data: NewCardType) {
        return instance.post('/cards/card', {card:data});
    },

    editCard(data: any) {
        return instance.put('/cards/card', {card:data});
    },

    setGrade(data: CardsGrade) {
        return instance.put('/cards/grade', data);
    }
}