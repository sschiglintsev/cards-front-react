import React, {FC, useState} from 'react';
import style_ from "./Card.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import {BasicModal} from "../../common/Modal/Modal";
import Rating from "@mui/material/Rating";

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
    }
    deleteCard: (id: string) => void
}

export const Card: FC<PropsType> = ({card, deleteCard}) => {
    const {question, answer, updated, grade, _id, isEditCard} = card;

    return (
        <>
            <StyledTableRow key={question}>
                <StyledTableCell component="th" scope="row">{question}</StyledTableCell>
                <StyledTableCell align="right">{answer}</StyledTableCell>
                <StyledTableCell align="right">{updated.slice(0, 10)}</StyledTableCell>
                <StyledTableCell align="right">
                    <Rating name="read-only" value={grade} readOnly />
                </StyledTableCell>
                <StyledTableCell align="right">
                    <div className={style_.buttons}>
                        <Button onClick={() => deleteCard(_id)}
                                variant="outlined"
                                color="error"
                                sx={{
                                    width: 30,
                                    height: 25,
                                }}>
                            Delete
                        </Button>
                        <BasicModal question={question} answer={answer} _id={_id}/>
                    </div>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
};