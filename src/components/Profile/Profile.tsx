import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { Navigate } from "react-router";
import { PATH } from "../Routes/Routes";
import { logoutTC } from "../../Redux/LoginReducer";
import s from "./Profile.module.css"
import user from './user.png'
import SliderComponent from '../Slider/Slider';
import PacksListTable, { ProfileTable } from '../Table/Table';
import { Button } from '@mui/material';

export const Profile = React.memo(() => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(state => state.login);
    const isLoggedIn = profile.isLoggedIn;

    const logout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <div className={s.ProfileCard}>
            <div className={s.ProfileInfo}>
                <div className={s.Description}>
                    <img src={profile.avatar ? profile.avatar : user}></img>
                    <div>{profile.email}</div>
                </div>
                <div className={s.SliderBlock}>
                    <div className={s.Label}>Number of cards</div>
                    <SliderComponent />
                </div>
            </div>
            <div className={s.PacksListBlock}>
                <div className={s.Sign}>Packs list {profile.name}`s <Button style={{float: "right"}} onClick={logout} variant='contained' color='primary'>Logout</Button></div>
                <ProfileTable />
            </div>
        </div>
    );
});