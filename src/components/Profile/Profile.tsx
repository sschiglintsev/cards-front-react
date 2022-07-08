import React from 'react';
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {Navigate} from "react-router";
import {PATH} from "../Routes/Routes";
import SuperButton from "../common/SuperButton/SuperButton";
import {logoutTC} from "../../Redux/LoginReducer";

export const Profile = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.login)
    const isLoggedIn = profile.isLoggedIn

    const logout =() => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            Profile
            {profile.name}
            {profile.email}
            {profile.publicCardPacksCount}
            <SuperButton onClick={logout}>Logout</SuperButton>
        </div>
    );
};
