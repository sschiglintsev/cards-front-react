import React, { useState } from 'react';
import s from "./ModalStyle.module.css"
import IconButton from '@mui/material/IconButton';
import { Button, FormControl, Input, InputLabel, Switch, FormControlLabel } from '@mui/material';
import { useAppDispatch } from '../../../Redux/hooks';
import { addPackTC } from '../../../Redux/ProfileReducer';


type PropsType = {
    closeModal: () => void
}

export const ModalAdd = (props: PropsType) => {
    const dispatch = useAppDispatch();
    let [title, setTitle] = useState<string>("");
    let [isPrivate, setIsPrivate] = useState<boolean>(false);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onChangePrivate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(event.target.checked);
    };

    const onSaveHandler = () => {
        dispatch(addPackTC(title, isPrivate));
        props.closeModal()
    }

    return <div className={s.Modal}>
        <div className={s.Header}>
            Add new pack <Button className={s.CloseButton} onClick={() => props.closeModal()}>X</Button>
        </div>
        <FormControlLabel
                control={<Switch
                    checked={isPrivate}
                    onChange={onChangePrivate}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color="secondary"

                />}
                label="is private"
                sx={{marginBottom: "30px"}}
            />
        <FormControl sx={{ m: 0, width: '327px' }} variant="outlined">
            
            <InputLabel sx={{ marginLeft: '-14px'}}
                htmlFor="outlined-adornment-password">Title</InputLabel>
            <Input
                id="outlined-adornment-password"
                type='text'
                value={title}
                onChange={onChangeTitle}
            />
        </FormControl>
        <div className={s.ButtonBox}>
            <button className={s.CancelButton} onClick={props.closeModal}>Cancel</button>
            <button className={s.SaveButton} onClick={onSaveHandler}>Save</button>
        </div>
    </div>
}