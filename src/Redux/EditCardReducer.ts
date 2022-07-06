
export type InitialStateType = {
    _id: string
    question: string 
    answer: string
}

const InitialState: InitialStateType = {
    _id: "", 
    question: "", // если не отправить будет таким 
    answer: "", // если не отправить будет таким 
}

export const EditCardReducer = (state: InitialStateType, action: ActionType) => {
    switch (action.type) {
        case 'CARD/EDIT_CARD':
            return { ...state, question: action.question, answer: action.answer }
    
        default:
            return {...state};
    }
}

export const editCardAC = (question: string, answer: string) => ({
    type: 'CARD/EDIT_CARD',
    question,
    answer,
} as const);

export type EditCardType = {
    type: 'CARD/EDIT_CARD'
    question: string
    answer: string
}

type ActionType = EditCardType;
 