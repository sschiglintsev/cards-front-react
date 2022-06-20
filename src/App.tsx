import React from 'react';
import style from './App.module.css'
import {RoutesPage} from "./components/Routes/Routes";
import {Header} from "./components/Header/Header";


function App() {
    return (
        <div className={style.app}>
            <Header/>
            <RoutesPage/>
        </div>
    );
}

export default App;
