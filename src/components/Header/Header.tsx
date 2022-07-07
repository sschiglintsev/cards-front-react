import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import s from './Header.module.css'
import { PATH } from "../Routes/Routes";

export const Header = () => {
    let [isVisible, setIsVisible] = useState(true);
    let location = useLocation();

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

