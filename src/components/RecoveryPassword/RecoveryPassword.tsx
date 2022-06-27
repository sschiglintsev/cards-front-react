import React, { FC } from 'react';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import style from './RecoveryPassword.module.css';
import { recoveryApi } from '../../VladApi/Api';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface State {
	email: string;
  }

export const RecoveryPassword: FC = () => {
	const onRecoveryButtonClick = (email: string) => {
		recoveryApi.recoveryPassword({
			email,
			message: `<div style="background-color: lime; padding: 15px">
					password recovery link: 
					<a href='http://localhost:3000/#/set-new-password/$token$'>
					link</a>
			</div>`
		});
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
          <InputLabel sx={{marginLeft: '-14px'}} htmlFor="outlined-adornment-password">Email</InputLabel>
          <Input
            id="outlined-adornment-password"
            type='text'
            value={values.email}
            onChange={handleChange('email')}
          />
        </FormControl>

		<p className={style.instructions}>Enter your email address and we will send you further instructions </p>
						
			<Button
				sx={{backgroundColor: '#21268F', width: '266px', borderRadius: '30px'}}
				type="submit"
				variant='contained'
				onClick={() => onRecoveryButtonClick(values.email)}>
				Send Instructions
			</Button>

					<div className={style.recoveryPasswordFooter}>
						<p>Did you remember your password?</p>
						<a className={style.linkToLogin} href='#'>Try loggin in</a>
					</div>
    </div>
  );
}
