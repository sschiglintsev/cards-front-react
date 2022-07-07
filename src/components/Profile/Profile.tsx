import React, { useEffect } from 'react';
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {Navigate} from "react-router";
import {PATH} from "../Routes/Routes";
import SuperButton from "../common/SuperButton/SuperButton";
import {logoutTC, loginTC, setIsLoggedInAC} from "../../Redux/LoginReducer";
import { LoginApi } from '../../api/login-api';

export const Profile = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        LoginApi.authMe()
            .then(res => {
                const {email, password, rememberMe} = res.data;
                dispatch(loginTC({email, password, rememberMe}))
            });
    }, []);

    const profile = useAppSelector(state => state.login)
    const isLoggedIn = profile.isLoggedIn
    console.log(profile);

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
