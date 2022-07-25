import React, { useState } from 'react';
import s from "./ModalStyle.module.css"
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../Redux/hooks';
import { addPackTC, deletePackTC } from '../../../Redux/ProfileReducer';


type PropsType = {
    closeModal: () => void
    setPage: () => void
    title: string
    id: string
}

export const ModalDelete = (props: PropsType) => {
    const dispatch = useAppDispatch();

    const onDeleteHandler = () => {
        dispatch(deletePackTC(props.id));
        props.closeModal()
        props.setPage()
    }

    return <div className={s.Modal}>
        <div className={s.Header}>
            Delete Pack <Button className={s.CloseButton} onClick={() => props.closeModal()}>X</Button>
        </div>
        <div>
            Do you really want to remove <b>{props.title}</b>?
            All cards will be excluded from this course.
        </div>

        <div className={s.ButtonBox}>
            <button className={s.CancelButton} onClick={props.closeModal}>Cancel</button>
            <button className={s.DeleteButtonModal} onClick={onDeleteHandler}>Delete</button>
        </div>
    </div>
}