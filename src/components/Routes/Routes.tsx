import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "../Main/Main";
import {Login} from "../Login/Login";
import {Error404} from "../Error404/Error404";
import {NewPassword} from "../NewPassword/NewPassword";
import {RecoveryPassword} from "../RecoveryPassword/RecoveryPassword";
import {Registration} from "../Registration/Registration";
import {Profile} from "../Profile/Profile";
import {Test} from "../Test/Test";
import { CheckEmail } from '../CheckEmail/CheckEmail';

export const PATH = {
    MAIN: '/main',
    LOGIN: '/login',
    ERROR: '/error404',
    NEW_PASSWORD:'/new-password',
    REGISTRATION:'/registration',
    PROFILE:'/profile',
    RECOVERY_PASSWORD:'/recovery-password',
    TEST:'/test',
    CHECK_EMAIL: '/check-email',
    PACKS_LIST: '/packs-list',
}

export const RoutesPage = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={PATH.MAIN} element={<Main/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.NEW_PASSWORD}>
                    <Route path=":userToken" element={<NewPassword/>}/>
                </Route>
                <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.ERROR} element={<Error404/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path="*" element={<Navigate to="/error404"/>}/>
            </Routes>
        </div>
    )
}
