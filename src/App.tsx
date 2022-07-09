import React, {useEffect} from 'react';
import style from './App.module.css'
import {PATH, RoutesPage} from "./components/Routes/Routes";
import {Header} from "./components/Header/Header";
import Error from './components/Error/Error';
import {AuthMeTC, loginTC} from "./Redux/LoginReducer";
import {useAppDispatch, useAppSelector} from "./Redux/hooks";
import {Navigate} from "react-router";


function App() {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

    useEffect(() => {
        dispatch(AuthMeTC())
    }, []);

    return (
        <div className={style.app}>
            <Header/>
            <RoutesPage/>
            <Error/>
        </div>
    );
}

export default App;
