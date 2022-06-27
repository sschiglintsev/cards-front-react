import React from 'react';
import style from './App.module.css'
import {RoutesPage} from "./components/Routes/Routes";
import {Header} from "./components/Header/Header";
import {useSelector} from "react-redux";
import {useAppSelector} from "./Redux/hooks";
import {Alert} from "@mui/material";


function App() {
    const infoMessage = useAppSelector(state => state.login.message)
    const errorStatus = useAppSelector(state => state.login.errorStatus)

    return (
        <div className={style.app}>
            <Header/>
            <RoutesPage/>
            {infoMessage?<Alert variant="filled" severity={errorStatus?"error":"success"}>
                {infoMessage}
            </Alert>:<div></div>}

        </div>
    );
}

export default App;
