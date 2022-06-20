import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "../Routes/Routes";
import c from "../Header/Header.module.css";

export const Error404 = () => {
    return (
        <div>
            <h1 className="text-jumbo text-ginormous">Oops!</h1>
            <div>Error code: 404</div>
            <h2>We can't seem to find the page you're looking for</h2>
            <ul className="list-unstyled">
                <li>Here are some helpful links instead:</li>
                <NavLink to={PATH.MAIN} className={c.link} >MAIN</NavLink>

            </ul>

        </div>
    )
}


