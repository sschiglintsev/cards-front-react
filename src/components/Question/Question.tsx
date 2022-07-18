import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import s from './Question.module.css'
import { PATH } from "../Routes/Routes";
import { cardType } from '../../api/cards-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../Redux/Store';
import { getCardsTC, setGradeTC } from '../../Redux/CardsReducer';
import { useAppDispatch } from '../../Redux/hooks';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: cardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return { sum: newSum, id: newSum < rand ? i : acc.id }
    }
        , { sum: 0, id: -1 });
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const { cards } = useSelector((store: RootStateType) => store.cards);
    const { packId } = useParams();
    let [value, setValue] = useState(1);
    let navigate = useNavigate();

    const [card, setCard] = useState<cardType>({
        _id: 'fake',
        cardsPack_id: '',
        user_id: "",
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        __v: 0,
        answerImg: "",
        answerVideo: "",
        questionImg: "",
        questionVideo: "",
        isEditCard: false,
    });

    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first && packId) {
            dispatch(getCardsTC(packId));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, packId, cards, first]);

    const onNext = () => {
        setIsChecked(false);
        setValue(1);
        if (cards.length > 0) {
            dispatch(setGradeTC(value, card._id));
        } else {

        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(+(event.target as HTMLInputElement).value);
    };

    return (
        <div className={s.Card} style={card.answer.length > 2000 ? {width: "1250px"} : {}}>
            <div className={s.Heading}>LearnPage</div>

            <div className={s.QuestionAnswer}><b>Question:</b> {card.question}</div>

            <div className={s.Wrapper} style={isChecked ? { display: "none" } : {}}>
                <button className={s.CancelBtn} onClick={() => navigate(-1)}>Cancel</button>
                <button className={s.ShowAnswerBtn} onClick={() => setIsChecked(true)}>Show answer</button>
            </div>


            {isChecked && (
                <>
                    <div className={s.QuestionAnswer}><b>Answer:</b> {card.answer}</div>
                    <div className={s.QuestionAnswer}><b>Rate yourself:</b></div>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={grades[0]}
                            name="radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {grades.map((g, i) => (
                                // <button className={s.Grade} key={'grade-' + i} onClick={() => {
                                // }}>{g}</button>
                                <FormControlLabel value={i + 1} control={<Radio />} label={`${g}`} key={i + 1} />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <div className={s.Wrapper}>
                        <button className={s.CancelBtn} onClick={() => navigate(-1)}>Cancel</button>
                        <button className={s.NextButton} onClick={onNext}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LearnPage;
