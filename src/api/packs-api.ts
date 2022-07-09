import { instance } from "./axiosConf";

export const packsAPI = {
    getPacks(payload: PacksRequestType) {
       // @ts-ignore
        return instance.get(`/cards/pack?pageCount=${payload.pageCount}&page=${payload.page}`);
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

type PacksResponseType = {
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