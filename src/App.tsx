import React, { useEffect } from 'react';
import style from './App.module.css'
import {RoutesPage} from "./components/Routes/Routes";
import {Header} from "./components/Header/Header";
import Error from './components/Error/Error';
import { recoveryApi } from './api/Api';


function App() { 

    useEffect(() => {
        recoveryApi.isLogin()
            .then(res => console.log(res));
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
