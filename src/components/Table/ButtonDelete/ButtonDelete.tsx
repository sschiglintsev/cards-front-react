import Button from "@mui/material/Button";
import React, {FC, useState} from "react";
import {BasicModal} from "../../common/Modal/BasicModal";
import { ModalDelete } from "./ModalDelete";
import s from "./ModalStyle.module.css"
type PropsType = {
    isVisible: boolean
    title: string
    id: string
    setPage: () => void
}

export const ButtonDelete = (props: PropsType)=> {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={s.ButtonContainer} style={{ visibility: props.isVisible ? "visible" : "hidden" }}>
            <button className={s.DeleteButton} onClick={handleOpen}>Delete</button>
            <BasicModal handleClose={handleClose} open={open} >
                <ModalDelete closeModal={handleClose} title={props.title} id={props.id} setPage={props.setPage}/>
            </BasicModal>
        </div>
    );
};
