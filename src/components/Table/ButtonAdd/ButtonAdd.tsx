import Button from "@mui/material/Button";
import React, {FC, useState} from "react";
import {BasicModal} from "../../common/Modal/BasicModal";
import { ModalAdd } from "./ModalAdd";
import s from "./ModalStyle.module.css"
type PropsType = {
}

export const ButtonAdd = (props: PropsType)=> {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={s.ButtonContainer}>
            <Button variant='contained' color='primary' sx={{ borderRadius: "30px" }} onClick={handleOpen}>Add new pack</Button>
            <BasicModal handleClose={handleClose} open={open} >
                <ModalAdd closeModal={handleClose}/>
            </BasicModal>
        </div>
    );
};
