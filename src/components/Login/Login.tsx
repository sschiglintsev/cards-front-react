import React from 'react';
import Paper from "@mui/material/Paper";
import style from "./Login.module.css"
import TextField from "@mui/material/TextField";
import {FormControl, FormGroup, Grid, LinearProgress} from "@mui/material";
import {PATH} from "../Routes/Routes";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {Navigate} from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {loginTC} from "../../Redux/LoginReducer";
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import s from "./Login.module.css";
import {Container} from "@mui/system";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Password must be at least 3 characters';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={s.Wrapper}>
            <Container maxWidth="lg">
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item marginTop={15}>
                        <Paper className={s.Paper}>
                            <div className={s.Heading}>
                                It-incubator
                            </div>
                            <div className={s.Title}>
                                Sing in
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl className={s.FormControl}>
                                    <FormGroup className={s.FormGroup}>
                                        <TextField
                                            type="email"
                                            label="Email"
                                            placeholder="johndoe@email.com"
                                            size='medium'
                                            fullWidth={true}
                                            variant='standard'
                                            margin='normal'
                                            {...formik.getFieldProps('email')}
                                            onBlur={formik.handleBlur}/>
                                        {formik.touched.email && formik.errors.email ?
                                            <div style={{color: "red"}}>{formik.errors.email}</div> : <div></div>}
                                        <TextField label="Password"
                                                   type="password"
                                                   placeholder="password"
                                                   size='medium'
                                                   fullWidth={true}
                                                   hidden
                                                   variant='standard'
                                                   margin='normal'
                                                   {...formik.getFieldProps('password')}
                                                   onBlur={formik.handleBlur}/>
                                        {formik.touched.password && formik.errors.password ?
                                            <div style={{color: "red"}}>{formik.errors.password}</div> : <div></div>}
                                        <div className={style.field}>
                                            <FormControlLabel label={'Remember me'}
                                                              control={<Checkbox
                                                                  {...formik.getFieldProps('rememberMe')}
                                                              />}
                                            />
                                        </div>
                                        <div className={s.linkForgotPass}>
                                            <NavLink to={PATH.RECOVERY_PASSWORD}>Forgot password</NavLink>
                                        </div>
                                        <Grid container justifyContent={"center"}>
                                            <button className={s.LoginButton} type={"submit"}>
                                                Login
                                            </button>
                                        </Grid>
                                        <div className={s.notAccount}>
                                            Don't have an account?
                                        </div>
                                        <div className={s.linkSignUp}>
                                            <NavLink to={PATH.REGISTRATION}>Sign up</NavLink>
                                        </div>
                                    </FormGroup>
                                </FormControl>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
