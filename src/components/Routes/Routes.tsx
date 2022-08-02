import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "../Main/Main";
import { Login } from "../Login/Login";
import { Error404 } from "../Error404/Error404";
import { NewPassword } from "../NewPassword/NewPassword";
import { RecoveryPassword } from "../RecoveryPassword/RecoveryPassword";
import { Registration } from "../Registration/Registration";
import { Profile } from "../Profile/Profile";
import { Test } from "../Test/Test";
import { CheckEmail } from '../CheckEmail/CheckEmail';
import { Cards } from "../Cards/Cards";
import { EditCardInfo } from "../EditCardInfo/EditCardInfo";
import { PacksList } from '../PacksList/PacksList';
import LearnPage from '../Question/Question';
import { MainProfile } from '../MainProfile/MainProfile';

export const PATH = {
    MAIN: '/main',
    LOGIN: '/login',
    ERROR: '/error404',
    NEW_PASSWORD: '/new-password',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RECOVERY_PASSWORD: '/recovery-password',
    TEST: '/test',
    CHECK_EMAIL: '/check-email',
    CARD: '/cards/card',
    ADD_NEW_CARD: '/cards/card/create-card',
    PACKS_LIST: '/packs-list',
    PROFILE_CARD: '/profile/card'
}

export const RoutesPage = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Profile />} />
                <Route path={PATH.MAIN} element={<Main />} />
                <Route path={PATH.LOGIN} element={<Login />} />
                <Route path={PATH.NEW_PASSWORD}>
                    <Route path=":userToken" element={<NewPassword />} />
                </Route>
                <Route path={PATH.ADD_NEW_CARD}>
                    <Route path=":packId" element={<EditCardInfo />} />
                </Route>
                <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword />} />
                <Route path={PATH.REGISTRATION} element={<Registration />} />
                {/* <Route path={PATH.PROFILE} element={<Profile />} /> */}
                <Route path={PATH.PROFILE} element={<MainProfile />} />
                <Route path={PATH.ERROR} element={<Error404 />} />
                <Route path={PATH.TEST} element={<Test />} />
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
                <Route path={PATH.PACKS_LIST} element={<PacksList />} />
                <Route path={PATH.CARD}>
                    <Route path=':packId' element={<LearnPage />}/>
                </Route>
                <Route path="*" element={<Navigate to="/error404" />} />
                <Route path={PATH.PROFILE_CARD}>
                    <Route path=":cardsPack_id" element={<Cards />} />
                </Route>
            </Routes>
        </div>
    )
}
