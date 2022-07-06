import React  from 'react';
import style from './App.module.css'
import {RoutesPage} from "./components/Routes/Routes";
import {Header} from "./components/Header/Header";
import Error from './components/Error/Error';


function App() { 

      return (
        <div className={style.app}>
            <Header/>
            <RoutesPage/>
            <Error/>
        </div>
    );
}

export default App;
