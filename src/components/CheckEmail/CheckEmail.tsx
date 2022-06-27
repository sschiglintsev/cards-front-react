import { FC } from "react";
import style from './CheckEmail.module.css'

export const CheckEmail: FC = () => {
    return (
        <div className={style.checkEmailWrapper}>
            <h1 className={style.title}>It-incubator</h1>
            <div className={style.icon}></div>
            <h2>Check Email</h2>

            <p className={style.info}>We’ve sent an Email with instructions to example@mail.com</p>
        </div>
    );
};