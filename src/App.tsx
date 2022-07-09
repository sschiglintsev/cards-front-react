import React, {useEffect} from 'react';
import style from './App.module.css'
import {RoutesPage} from "./components/Routes/Routes";
import {Header} from "./components/Header/Header";
import Error from './components/Error/Error';
import {AuthMeTC, loginTC} from "./Redux/LoginReducer";
import {useAppDispatch} from "./Redux/hooks";


function App() {

    const dispatch = useAppDispatch()

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
