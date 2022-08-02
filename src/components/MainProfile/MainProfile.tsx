import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logoutTC } from "../../Redux/LoginReducer";
import { Header } from "../Header/Header";
import { PATH } from "../Routes/Routes";
import style from './MainProfile.module.css';

export const MainProfile: FC = () => {
    const dispatch = useAppDispatch();
    const {avatar, email, name, isLoggedIn} = useAppSelector(state => state.login);
    const [changeNameStatus, setChangeNameStatus] = useState(false);
    const [inputValue, setInputValue] = useState(name);
    

    const logout = () => {
        dispatch(logoutTC())
    }

    const onChangeNameStatus = () => {
        setChangeNameStatus(!changeNameStatus)
    }

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <div>
            <div className={style.wrapper}>
                <p className={style.backLink}>Back to Packs List</p>

                <div className={style.personalInfo}>
                    <h1 className={style.title}>Personal Information</h1>

                    <img src={avatar} className={style.avatar}></img>
                    
                    <div className={style.changeNameWrapper}>
                        {changeNameStatus ?
                        <>
                            <TextField
                            sx={{width: '347px', position: 'relative', marginLeft: '55px'}}
                            id="standard-multiline-flexible"
                            label="Nickname"
                            multiline
                            maxRows={4}
                            value={inputValue}
                            onChange={onChangeInputValue}
                            variant="standard"
                        />
                        <Button className={style.saveBtn}
                            sx={{width: '52px', height: '24px', fontSize: '12px', lineHeight: '24px'}}
                            variant="contained"
                            onClick={onChangeNameStatus}>
                            save
                        </Button>
                        </>
                        :
                        <>
                            <p className={style.name}>{name}</p>
                            <button type='button' className={style.changeNameBtn} onClick={onChangeNameStatus}></button>
                        </>
                      }
                    </div>  

                    <p className={style.email}>{email}</p>

                    <button 
                        type="button" 
                        className={style.logoutBtn}
                        onClick={logout}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}