import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import {editCardTC} from "../../../Redux/CardsReducer";
import {useAppDispatch} from "../../../Redux/hooks";

type propsType = {
    question: string,
    answer: string,
    _id: string,
    setOpen?:(value:boolean)=>void
}

export const ModalEditCard = (props:propsType) => {

    const dispatch = useAppDispatch();

    const [question, setQuestion] = React.useState<string>(props.question);
    const [answer, setAnswer] = React.useState<string>(props.answer);

    const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    }

    const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    const onEdidCard = () => {
        dispatch(editCardTC(props._id, question, answer))
        // @ts-ignore
        props.handleClose()
    }

    const onClickCancel = () => {
        // @ts-ignore
        props.handleClose()
    }
    return (
        <div>
            <h1>Card info</h1>
            <FormControl sx={{m: 0, width: '347px'}} variant="outlined">
                <InputLabel sx={{marginLeft: '-14px'}}
                            htmlFor="outlined-adornment-password">Question</InputLabel>
                <Input
                    id="outlined-adornment-password"
                    type='text'
                    value={question}
                    onChange={onChangeQuestion}
                />
            </FormControl>

            <FormControl sx={{m: 0, width: '347px'}} variant="outlined">
                <InputLabel sx={{marginLeft: '-14px'}}
                            htmlFor="outlined-adornment-password">Answer</InputLabel>
                <Input
                    id="outlined-adornment-password"
                    type='text'
                    value={answer}
                    onChange={onChangeAnswer}
                />
            </FormControl>

            <Box sx={{width: '100%', justifyContent: 'space-around', display: 'flex', marginTop: '81px'}}>
                <Button
                    sx={{backgroundColor: '#21268F', width: '124px', borderRadius: '30px'}}
                    variant="contained"
                    onClick={() => onClickCancel()}
                >
                    Cancel
                </Button>

                <Button
                    sx={{backgroundColor: '#21268F', width: '124px', borderRadius: '30px'}}
                    variant="contained"
                    onClick={() => onEdidCard()}
                >
                    Save
                </Button>
            </Box>
        </div>
    );
};
