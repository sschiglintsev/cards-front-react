import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import s from './Header.module.css'
import { PATH } from "../Routes/Routes";
import { LinearProgress } from '@mui/material';
import { useAppSelector } from '../../Redux/hooks';

export const Header = () => {
    let [isVisible, setIsVisible] = useState(true);
    let location = useLocation();
    let isLoading = useAppSelector(state => state.app.isLoading);

    useEffect(() => {
        if (location.pathname === PATH.LOGIN ||
            location.pathname === PATH.REGISTRATION ||
            location.pathname === PATH.RECOVERY_PASSWORD) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    }, [location])

    return (
        <div className={isVisible ? s.Header : s.Invisible}>
            {isLoading && <LinearProgress/>}
            <div className={s.Logo}>It-incubator</div>
            <div className={s.Wrapper}>
                <NavLink to={PATH.PACKS_LIST} className={({ isActive }) => isActive ? s.ActiveLink : s.Link}>
                    <i className="fa-brands fa-buffer fa-xl"></i>
                    Packs list
                    </NavLink>
                <NavLink to={PATH.PROFILE} className={({ isActive }) => isActive ? s.ActiveLink : s.Link}>
                    <i className="fa-regular fa-user fa-xl"></i>
                    Profile
                </NavLink>
            </div>
            
        </div>
    )
}

