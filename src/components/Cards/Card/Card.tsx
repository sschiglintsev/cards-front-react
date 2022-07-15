import React, {FC, useState} from 'react';
import style from "./Card.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import {changeCardEditStatus} from '../../../Redux/CardsReducer';
import {useDispatch} from 'react-redux';
import {CardsApi} from '../../../api/cards-api';
import {SuperCardInput} from '../../common/SuperCardInput/SuperCardInput';

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
    // hide last border
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
    // editButton: (id: string) => void
}

export const Card: FC<PropsType> = ({card, deleteCard}) => {
    const dispatch = useDispatch();
    const {question, answer, updated, grade, _id, isEditCard} = card;

    const [questionValue, setQuestionValue] = useState<string>(question);
    const [answerValue, setAnswerValue] = useState<string>(answer);

    const onChangeQuestion = (text: string) => {
        setQuestionValue(text);
    }

    const onChangeAnswer = (text: string) => {
        setAnswerValue(text);
    }

    const editButton = () => {
        if (isEditCard) {
            CardsApi.editCard({
                _id: _id,
                question: questionValue,
                answer: answerValue,
            }).then(res => console.log(res.data))
        }
        dispatch(changeCardEditStatus(_id))
    }
    return (
        <StyledTableRow key={question}>
            {/* {!isEditCard ? <StyledTableCell component="th" scope="row">{question}</StyledTableCell> : <input type='text'></input>} */}
            <SuperCardInput isEditCard={isEditCard} text={questionValue} onChangeEvent={onChangeQuestion}/>
            <SuperCardInput isEditCard={isEditCard} text={answerValue} onChangeEvent={onChangeAnswer}/>
            {/* <StyledTableCell align="right">{answer}</StyledTableCell> */}
            <StyledTableCell align="right">{updated.slice(0, 10)}</StyledTableCell>
            <StyledTableCell align="right">{grade}</StyledTableCell>
            <StyledTableCell align="right">
                <div className={style.buttons}>
                    <Button onClick={() => deleteCard(_id)}
                            variant="outlined"
                            color="error"
                            sx={{
                                width: 30,
                                height: 25,
                            }}>
                        Delete
                    </Button>
                    <Button onClick={() => {
                        editButton()
                    }}
                            variant="contained"
                            color="success"
                            sx={{
                                width: 30,
                                height: 25,
                            }}>
                        {isEditCard ? 'Save' : 'Edit'}
                    </Button>
                </div>
            </StyledTableCell>
        </StyledTableRow>
    );
};