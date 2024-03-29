import { FormControl, FormGroup, Grid, LinearProgress, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { registerUserTC } from '../../Redux/RegistrationReducer';
import { PATH } from '../Routes/Routes';
import s from "./Registration.module.css";
import { RootStateType } from "../../Redux/Store";

type ErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = React.memo(() => {
    let dispatch = useAppDispatch();

    let isRegistered = useAppSelector(store => store.registration.isRegistered);
    let isLoading = useAppSelector(state => state.app.isLoading);

    let navigate = useNavigate();

    function onCancelClickHandler() {
        navigate(PATH.LOGIN);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: ErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            } else if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 3) {
                errors.password = "Too short!"
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords don't match"
            }
            return errors;
        },
        onSubmit: values => {
            let res = { email: values.email, password: values.password }
            dispatch(registerUserTC(res))
            formik.resetForm();
        },
    })

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <div className={s.Wrapper}>
            <Container maxWidth="lg">
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item marginTop={15}>
                        {isLoading && <LinearProgress/>}
                        <Paper className={s.Paper}>
                            <div className={s.Heading}>
                                It-incubator
                            </div>
                            <div className={s.Title}>
                                Sign Up
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl className={s.FormControl}>
                                    <FormGroup className={s.FormGroup}>
                                        <TextField label="email"
                                            size='medium'
                                            fullWidth={true}
                                            variant='standard'
                                            margin='normal'
                                            {...formik.getFieldProps('email')}
                                            onBlur={formik.handleBlur} />
                                        {formik.touched.email && formik.errors.email ?
                                            <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
                                        <TextField label="password"
                                            type="password"
                                            size='medium'
                                            fullWidth={true}
                                            hidden
                                            variant='standard'
                                            margin='normal'
                                            {...formik.getFieldProps('password')}
                                            onBlur={formik.handleBlur} />
                                        {formik.touched.password && formik.errors.password ?
                                            <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
                                        <TextField label="Сonfirm password"
                                            type="password"
                                            size='medium'
                                            fullWidth={true}
                                            variant='standard'
                                            margin='normal'
                                            {...formik.getFieldProps('confirmPassword')}
                                            onBlur={formik.handleBlur} />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                            <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div> : null}
                                        <Grid container justifyContent={"space-between"}>
                                            <button className={s.CancelButton} onClick={onCancelClickHandler} type={"button"}>
                                                Cancel
                                            </button>
                                            <button className={s.RegisterButton} type={"submit"}>
                                                Register
                                            </button>
                                        </Grid>
                                    </FormGroup>
                                </FormControl>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
});
