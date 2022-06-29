import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {LoginReducer} from "./LoginReducer";
import {NewasswordReducer} from "./NewPasswordReducer";
import {ProfileReducer} from "./ProfileReducer";
import {RegistrationActionType, RegistrationReducer} from "./RegistrationReducer";
import {RecoveryPasswordReducer} from "./RecoveryPasswordReducer";

const rootReducer = combineReducers({
    login: LoginReducer,
    newPassword:NewasswordReducer,
    profile:ProfileReducer,
    registration:RegistrationReducer,
    RecoveryPassword:RecoveryPasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

//common AC type
export type AppActionsType = RegistrationActionType

//custom typed dispatch (support thunk's & AppActionsType actions)
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

//thunk type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// @ts-ignore
window.store = store;