import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import style from './EditCardInfo.module.css';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { newPasswordTC } from '../../Redux/NewPasswordReducer';
import { useNavigate } from 'react-router-dom';
import { CardsApi } from '../../api/cards-api';
import { useAppDispatch } from '../../Redux/hooks';
import { setMessageAC } from '../../Redux/AppReducer';

export const EditCardInfo = React.memo(() => {
    const dispatch = useAppDispatch();

    const [question, setQuestion] = React.useState<string>('');
    const [answer, setAnswer] = React.useState<string>('');

    let navigate = useNavigate();

    const {packId} = useParams();

    const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    }

    const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    const onCreateNewCard = async () => {
        // CardsApi.createCard({
        //     cardsPack_id: packId,
        //     question,
        //     answer,
        // })
        // .then((res) => console.log(res))

        try {
            await CardsApi.createCard({
                cardsPack_id: packId,  
                question,
                answer,
            })
          } catch (error: any) {
            dispatch(setMessageAC(error.response.data.error, true))
            console.log(error.response.data.error);
          }
    }

    return (
        <div>
            <nav>
                <span>It-incubator</span>
                <div>Packs list</div>
                <div>Profile</div>
            </nav>
            <div className={style.wrapper}>
                <h1 className={style.title}>Card info</h1>
                <FormControl sx={{ m: 0, width: '347px' }} variant="outlined">
                <InputLabel sx={{marginLeft: '-14px'}} htmlFor="outlined-adornment-password">Question</InputLabel>
                <Input
                    id="outlined-adornment-password"
                    type='text'
                    value={question}
                    onChange={onChangeQuestion}
                />
                {/* <p className={style.info}>Attach file</p> */}

                <label htmlFor="button-file">
                    + Attach file
                    <input className={style.containedButtonFile} id='button-file' type='file'></input>
                </label>
                </FormControl>
                
                <FormControl sx={{ m: 0, width: '347px' }} variant="outlined">
                <InputLabel sx={{marginLeft: '-14px'}} htmlFor="outlined-adornment-password">Answer</InputLabel>
                <Input
                    id="outlined-adornment-password"
                    type='text'
                    value={answer}
                    onChange={onChangeAnswer}
                />
                <label htmlFor="button-file">
                    + Attach file
                    <input className={style.containedButtonFile} id='button-file' type='file'></input>
                </label>
                </FormControl>

                {/* <p className={style.info}>Attach file</p> */}
                <Box sx={{width: '100%', justifyContent: 'space-around', display: 'flex', marginTop: '81px'}}>
                    <Button 
                        sx={{backgroundColor: '#21268F', width: '124px', borderRadius: '30px'}}
                        variant="contained"
                        onClick={() => navigate(-1)}
                        >
                        Cancel
                    </Button>

                    <Button 
                        sx={{backgroundColor: '#21268F', width: '124px', borderRadius: '30px'}}
                        variant="contained"
                        onClick={() => onCreateNewCard()}
                        >
                        Save
                    </Button>
                </Box>
            </div>
        </div>
    )
});