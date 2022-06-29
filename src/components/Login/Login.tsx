import React from 'react';
import Paper from "@mui/material/Paper";
import style from "./Login.module.css"
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {PATH} from "../Routes/Routes";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {Navigate} from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {loginTC} from "../../Redux/LoginReducer";
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";

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
        <div className={style.loginContainer}>
            <Paper elevation={3}
                   sx={{
                       width: "413px",
                       height: "600px"
                   }}>
                <div className={style.labelCards}>
                    <div className={style.loginTitle}>
                        <label>
                            Cards
                        </label>
                    </div>
                    <div className={style.loginSingIn}>
                        <label>
                            Sing in
                        </label>
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit} className={style.form}>
                            <div className={style.field}>
                                <TextField
                                    type="email"
                                    placeholder="johndoe@email.com"
                                    label="Email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            </div>
                            <div className={style.field}>
                                <TextField
                                    type="password"
                                    placeholder="password"
                                    label="Password"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            </div>
                            <div className={style.field}>
                                <FormControlLabel label={'Remember me'}
                                                  control={<Checkbox
                                                      {...formik.getFieldProps('rememberMe')}
                                                  />}/>

                            </div>
                            <div className={style.field}>
                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                    Don't have an account?
                    <NavLink to={PATH.REGISTRATION} className={style.linkSignUp}>Sign up</NavLink>
                </div>

            </Paper>
        </div>
    );
};
