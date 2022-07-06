import { Button } from '@mui/material';
import React, { useState } from 'react';
import style from './AddNewCard.module.css';

export const AddNewCard = React.memo(() => {
    const [text, setText] = useState('');

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.backLinkWrapper}>
                <a className={style.backLink} href='#'></a>
                <p className={style.title}>Pack Name</p>
            </div>
            
            <div className={style.searchInputWrapper}>
                <input 
                    className={style.searchInput}
                    value={text}
                    onChange={onChangeInput}
                    type='text'
                    placeholder='Search...'>    
                </input>

                <Button 
                        sx={{backgroundColor: '#21268F', width: '184px', borderRadius: '30px'}}
                        variant="contained">
                        Add new card
                </Button>
            </div>
            <p className={style.text}>This pack is empty. Click add new card to fill this pack</p>
        </div>
    );
});