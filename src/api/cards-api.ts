import {AxiosResponse} from 'axios'
import {instance} from "./axiosConf";

export type CardsParamsType = {
    cardAnswer?: string,
    cardQuestion: string,
    cardsPack_id:string,
    min: number,
    max: number,
    sortCards:string;
    page:number,
    pageCount:number
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
    "questionVideo": string
}

type ResponseType = {
"cards": cardType[]
}


export const CardsApi = {
    getCards(data: CardsParamsType) {
        // @ts-ignore
        return instance.get<CardsParamsType, AxiosResponse<ResponseType>>('/cards/card', data);
    },

}