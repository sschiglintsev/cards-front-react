import React from 'react';
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { Navigate } from "react-router";
import { PATH } from "../Routes/Routes";
import SuperButton from "../common/SuperButton/SuperButton";
import { logoutTC } from "../../Redux/LoginReducer";
import s from "./Profile.module.css"
import user from './user.png'
import SliderComponent from '../Slider/Slider';
import { Input, InputAdornment, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PacksListTable from '../Table/Table';

export const Profile = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.login)
    const isLoggedIn = profile.isLoggedIn

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
                <div className={s.Sign}>Packs list Petr's</div>
                <PacksListTable/>
            </div>
        </div>
    );
};
