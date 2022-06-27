import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import style from './NewPassword.module.css';
import { Button } from '@mui/material';
import { recoveryApi } from '../../VladApi/Api';

interface State {
  password: string;
  showPassword: boolean;
}

export const NewPassword: React.FC = () => {
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmitButton = () => {
    recoveryApi.setNewPassword({
        password: values.password,
        resetPasswordToken: 'asdjghaskldjh3'
    }).then(data => console.log(data))
  };

  return (
      <div className={style.wrapper}>
        <h1 className={style.title}>It-incubator</h1>
        <h2 className={style.forgotPasswordTitle}>Create new password</h2>
        <FormControl sx={{ m: 0, width: '347px' }} variant="outlined">
          <InputLabel sx={{marginLeft: '-14px'}} htmlFor="outlined-adornment-password">Password</InputLabel>
          <Input
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <p className={style.info}>Create new password and we will send you further instructions to email</p>
        <Button 
            sx={{backgroundColor: '#21268F', width: '266px', borderRadius: '30px'}}
            variant="contained"
            onClick={onSubmitButton}>Create new password</Button>
      </div>
      )}