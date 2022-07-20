import React, {ChangeEvent} from 'react';
import {IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { convertFileToBase64 } from '../../../utils/consvertFileToBase64';
import { useDispatch } from 'react-redux';
import { LoginApi } from '../../../api/login-api';
import { AuthMeTC } from '../../../Redux/LoginReducer';

export const InputTypeFile = React.memo(() => {
    const dispatch = useDispatch();

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    // dispatch(updateProfileTC({avatar: file64}))
                    LoginApi.changeAvatar(file64)
                        .then(res => {
                            if (res.status === 200) {
                                dispatch<any>(AuthMeTC())
                            }
                        });
                })
            } else {
                // dispatch(setAppErrorAC('Файл слишком большого размера'))
                alert('Файл слишком большого размера');
            }
        }
    };

    return (
        <label>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
            />
            <IconButton component="span">
                <CloudUploadIcon/>
            </IconButton>
        </label>
    )
})