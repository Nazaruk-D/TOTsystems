import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { setAppErrorAC, setAppInformMessage } from '../../../../store/slices/appSlice';
import { registerValidation } from '../registerValidation';
import { Path } from '../../../../enums/path';
import s from '../../login/LoginForm/LoginForm.module.scss';
import { useRegistrationMutation } from '../../../../store/api/authAPISlice';
import { setIsLoggedIn } from '../../../../store/slices/userSlice';

const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [inProgress, setInProgress] = useState(false);
    const [sendRegistrationData, { data, error }] = useRegistrationMutation();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => registerValidation(values),
        onSubmit: async (values) => {
            try {
                const { name, email, password } = values;
                await sendRegistrationData({ name, email, password });
                navigate(Path.Login);
            } catch {
                dispatch(setAppErrorAC('error registered'));
                setInProgress(false);
            }
        },
    });

    return (
        <Paper elevation={3} className={s.loginFormContainer}>
            <Box className={s.loginFormBlock}>
                <Typography
                    variant="h4"
                    noWrap
                    component="h4"
                    sx={{
                        mr: 2,
                        display: 'flex',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Регистрация
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="standard"
                        id="name"
                        label="User Name"
                        className={s.input}
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && <div style={{ color: 'red' }}>{formik.errors.name}</div>}
                    <TextField
                        fullWidth
                        variant="standard"
                        id="email"
                        label="Email"
                        className={s.input}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
                    <TextField
                        fullWidth
                        variant="standard"
                        id="password"
                        label="Password"
                        type="password"
                        className={s.input}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                    <TextField
                        fullWidth
                        variant="standard"
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        className={s.input}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: '10px' }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        {inProgress ? <CircularProgress size={24} color="inherit" /> : 'Sign up'}
                    </Button>
                </form>
            </Box>
        </Paper>
    );
};

export default RegistrationForm;
