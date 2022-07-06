import axios, { AxiosResponse } from "axios";
import { RegisterValuesType } from "../Redux/RegistrationReducer";
import { instance } from "./app-api";

export const packsAPI = {
    getPacks(payload: PacksRequestType) {
       // @ts-ignore
        return instance.get(`/cards/pack`, payload);
    }
}

type PacksRequestType = {
    packName?: string // не обязательно 
    min?: number, // не обязательно 
    max?: number, // не обязательно 
    sortPacks?: string,// не обязательно 
    page?: number, // не обязательно 
    pageCount?: number, // не обязательно 
    user_id?: string,
}

type RegisterResponseType = {
    cardPacks: [ 
        { 
        _id: string
        user_id: string 
        name: string 
        cardsCount: number 
        created: string
        updated: string
        }, 
        ] 
        cardPacksTotalCount: number
         // количество колод 
        maxCardsCount: number
        minCardsCount: number
        page: number // выбранная страница 
        pageCount: number
         // количество элементов на странице
        
}