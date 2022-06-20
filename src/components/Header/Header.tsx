import React from 'react'
import {NavLink} from "react-router-dom";
import c from './Header.module.css'
import {PATH} from "../Routes/Routes";

export const Header = () => {
    return (
        <div >
            <NavLink to={PATH.MAIN} className={c.link} >MAIN</NavLink>----
            <NavLink to={PATH.LOGIN} className={c.link} >LOGIN</NavLink>----
            <NavLink to={PATH.NEW_PASSWORD} className={c.link} >NEW_PASSWORD</NavLink>----
            <NavLink to={PATH.RECOVERY_PASSWORD} className={c.link} >RECOVERY_PASSWORD</NavLink>----
            <NavLink to={PATH.REGISTRATION} className={c.link} >REGISTRATION</NavLink>----
            <NavLink to={PATH.PROFILE} className={c.link} >PROFILE</NavLink>----
            <NavLink to={PATH.ERROR} className={c.link} >ERROR</NavLink>----
            <NavLink to={PATH.TEST} className={c.link} >TEST</NavLink>----
        </div>
    )
}

