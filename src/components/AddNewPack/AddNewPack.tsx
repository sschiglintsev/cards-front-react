import { Button, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { packsAPI } from "../../api/packs-api";
import { useAppDispatch } from "../../Redux/hooks";
import { addPackTC } from "../../Redux/ProfileReducer";
import style from './AddNewPack.module.css';
type PropsType = {
    changeAddPackStatus: () => void
}

export const AddNewPack: FC<PropsType> = ({changeAddPackStatus}) => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');

    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onClickCloseButton = () => {
        changeAddPackStatus();
    }

    const onClickSaveButton  = () => {
        dispatch(addPackTC(inputValue, false))
        onClickCloseButton();
    }
    return (
        <div className={style.modalWrapper}>
            <div className={style.header}>
                <span className={style.title}>Add new pack</span>
                <button className={style.closeButton} onClick={onClickCloseButton}>X</button>
            </div>

            <TextField 
                sx={{width: '347px', marginBottom: '40px'}}
                id="standard-basic"
                label="Name pack"
                variant="standard"
                value={inputValue}
                onChange={onChangeInputValue}
            />
            <div className={style.wrapper}>
                <Button variant="contained" onClick={onClickCloseButton}>Cancel</Button>
                <Button variant="contained" onClick={onClickSaveButton}>Save</Button>
            </div>
        </div>
    );
};