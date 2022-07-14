import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { Navigate } from "react-router";
import { PATH } from "../Routes/Routes";
import { logoutTC } from "../../Redux/LoginReducer";
import s from "./PacksList.module.css"
import SliderComponent from '../Slider/Slider';
import PacksListTable from '../Table/Table';
import { Button } from '@mui/material';
import { useState } from 'react';
import { getPacksTC, SetIsMyActiveAC } from '../../Redux/ProfileReducer';

export const PacksList = React.memo(() => {

    const dispatch = useAppDispatch();
    const profile = useAppSelector(state => state.login);
    const isMyActive = useAppSelector(state => state.profile.isMyActive);
    const isLoggedIn = profile.isLoggedIn;

    function onMyClickHandler() {
        dispatch(SetIsMyActiveAC(true))
        dispatch(getPacksTC(0));
    }
    function onAllClickHandler() {
        dispatch(SetIsMyActiveAC(false))
        dispatch(getPacksTC(0));
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <div className={s.ProfileCard}>
            <div className={s.ProfileInfo}>
                <div className={s.Description}>
                    Show packs cards
                    <div className={s.Toggler}>
                        <button className={isMyActive ? s.ActiveButton : s.Button} onClick={onMyClickHandler}>My</button>
                        <button className={isMyActive ? s.Button : s.ActiveButton} onClick={onAllClickHandler}>All</button>
                    </div>
                </div>
                <div className={s.SliderBlock}>
                    <div className={s.Label}>Number of cards</div>
                    <SliderComponent />
                </div>
            </div>
            <div className={s.PacksListBlock}>
                <div className={s.Sign}>Packs list</div>
                <PacksListTable/>
            </div>
        </div>
    );
});