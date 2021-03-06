import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {LoginActionsType, LoginReducer} from "./LoginReducer";
import {NewPasswordReducer} from "./NewPasswordReducer";
import {ProfileActionsType, ProfileReducer} from "./ProfileReducer";
import {RegistrationActionType, RegistrationReducer} from "./RegistrationReducer";
import {RecoveryPasswordReducer} from "./RecoveryPasswordReducer";
import { AppReducer } from './AppReducer';
import {CardsReduser} from "./CardsReducer";


const rootReducer = combineReducers({
    login: LoginReducer,
    newPassword:NewPasswordReducer,
    profile:ProfileReducer,
    registration:RegistrationReducer,
    RecoveryPassword:RecoveryPasswordReducer,
    app: AppReducer,
    cards:CardsReduser,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type AppActionType = LoginActionsType | RegistrationActionType | ProfileActionsType

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType,unknown,AppActionType>
//export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootStateType,unknown,AnyAction>

// @ts-ignore
window.store = store;