import React, { FC, useEffect } from 'react';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import style from './RecoveryPassword.module.css';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { recoveryPasswordAC, recoveryPasswordTC } from '../../Redux/RecoveryPasswordReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../Redux/Store';
import { useNavigate } from "react-router-dom";
import { PATH } from '../Routes/Routes';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

interface State {
	email: string;
}

export const RecoveryPassword: FC = () => {
	const dispatch = useDispatch();
	const info = useSelector<AppRootStateType, string>(state => state.RecoveryPassword.info);
	const error = useSelector<AppRootStateType, string>(state => state.RecoveryPassword.error);
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.RecoveryPassword.isLoading);

	const navigate = useNavigate();

	useEffect(() => {
		if (info !== '') {
			navigate(PATH.CHECK_EMAIL);
			dispatch(recoveryPasswordAC(''));
		}
	}, [info]);

	const onRecoveryButtonClick = (email: string) => {
		dispatch<any>(recoveryPasswordTC(email))
	};

	const [values, setValues] = React.useState<State>({
		email: '',
	  });
	
	  const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		  setValues({ ...values, [prop]: event.target.value });
		};

  return (
    <div className={style.wrapper}>
			<h1 className={style.title}>It-incubator</h1>
			<h2 className={style.forgotPasswordTitle}>Forgot your password?</h2>

		<FormControl sx={{ m: 0, width: '347px' }} variant="outlined">
          <InputLabel sx={{marginLeft: '-14px', color: error ? 'red' : ''}} htmlFor="outlined-adornment-password">{error || 'Email'}</InputLabel>
          <Input
            id="outlined-adornment-password"
            type='text'
            value={values.email}
            onChange={handleChange('email')}
          />
        </FormControl>
		<p className={style.instructions}>Enter your email address and we will send you further instructions </p>
						
			<LoadingButton
				loading={isLoading}
				variant="contained"
				sx={{backgroundColor: '#21268F', width: '266px', borderRadius: '30px'}}
				type="submit"
				onClick={() => onRecoveryButtonClick(values.email)}>
				Send Instructions
			</LoadingButton>

					<div className={style.recoveryPasswordFooter}>
						<p>Did you remember your password?</p>
						<a className={style.linkToLogin} href='#'>Try loggin in</a>
					</div>
    </div>
  );
}
