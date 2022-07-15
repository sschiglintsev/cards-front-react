import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Input from "@mui/material/Input";
import {useAppDispatch} from "../../../Redux/hooks";
import {editCardTC} from "../../../Redux/CardsReducer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type propsType = {
    question: string,
    answer: string,
    _id: string
}

export const BasicModal = (props: propsType) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        setOpen(false)
    }

    const onClickCancel = () => {
        setOpen(false)
    }
    return (
        <>
            <Button onClick={handleOpen}
                    variant="contained"
                    color="success"
                    sx={{
                        width: 30,
                        height: 25,
                    }}>
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                </Box>
            </Modal>
        </>
    );
}