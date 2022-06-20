import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {LoginReducer} from "./LoginReducer";
import {NewasswordReducer} from "./NewPasswordReducer";
import {ProfileReducer} from "./ProfileReducer";
import {RegistrationReducer} from "./RegistrationReducer";

const rootReducer = combineReducers({
    login: LoginReducer,
    newPassword:NewasswordReducer,
    profile:ProfileReducer,
    registration:RegistrationReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;