import React, {FC, useState} from 'react';
import style_ from "./Card.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import {useAppSelector} from "../../../Redux/hooks";
import {ModalEditCard} from "../ModalEditCard/ModalEditCard";
import {BasicModal} from "../../common/Modal/BasicModal";
import {ButtonDelete} from "./ButtonDelete";
import {ButtonEdit} from "./ButtonEdit";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ECECF9',
        color: '#2D2E46',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '13px',
        lineHeight: '16px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type PropsType = {
    card: {
        question: string
        answer: string
        updated: string
        grade: number
        _id: string
        isEditCard: boolean
        user_id:string
    }
    deleteCard: (id: string) => void
}

export const Card: FC<PropsType> = ({card, deleteCard}) => {
    const {question, answer, updated, grade, _id, user_id} = card;
    const idUser = useAppSelector(state => state.login._id)
    let isMyActive = false

    if (idUser===user_id && user_id!==undefined) {
        isMyActive = true
     } else  { isMyActive = false}



    return (
        <>
            <StyledTableRow key={question}>
                <StyledTableCell component="th" scope="row">{question}</StyledTableCell>
                <StyledTableCell align="right">{answer}</StyledTableCell>
                <StyledTableCell align="right">{updated.slice(0, 10)}</StyledTableCell>
                <StyledTableCell align="right">
                    <Rating name="read-only" value={grade} readOnly />
                </StyledTableCell>
                {isMyActive
                    ?<StyledTableCell align="right">
                        <div className={style_.buttons}>
                            <ButtonDelete id={_id} deleteCard={deleteCard}/>
                            <ButtonEdit question={question} answer={answer} id={_id}/>
                        </div>
                    </StyledTableCell>
                :<></>}

            </StyledTableRow>
        </>
    );
};