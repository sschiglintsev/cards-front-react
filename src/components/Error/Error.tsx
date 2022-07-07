import { Alert } from "@mui/material";
import React, { useEffect } from "react";
import { setMessageAC } from "../../Redux/AppReducer";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import s from "./Error.module.css"

const Error = () => {
    const dispatch = useAppDispatch();
    const infoMessage = useAppSelector(state => state.app.message)
    const errorStatus = useAppSelector(state => state.app.errorStatus)


    setTimeout(() => {
        dispatch(setMessageAC("", false));
    }, 3000)


    if (!errorStatus && infoMessage === "") {
        return null;
    }

    return (
        <div className={s.Error}>
            <Alert variant="filled" severity={errorStatus ? "error" : "success"}>
                {infoMessage}
            </Alert>
        </div>
    )
}

export default Error;