import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {LoginActionsType, LoginReducer} from "./LoginReducer";
import {NewasswordReducer} from "./NewPasswordReducer";
import {ProfileReducer} from "./ProfileReducer";
import {RegistrationReducer} from "./RegistrationReducer";
import {RecoveryPasswordReducer} from "./RecoveryPasswordReducer";


const rootReducer = combineReducers({
    login: LoginReducer,
    newPassword:NewasswordReducer,
    profile:ProfileReducer,
    registration:RegistrationReducer,
    RecoveryPassword:RecoveryPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type AppActionType = LoginActionsType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState,unknown,AppActionType>
//export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown,AnyAction>

// @ts-ignore
window.store = store;