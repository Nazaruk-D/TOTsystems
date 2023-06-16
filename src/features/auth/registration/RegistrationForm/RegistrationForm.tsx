import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { setAppErrorAC, setAppInformMessage } from '../../../../store/slices/appSlice';
import { registerValidation } from '../registerValidation';
import { Path } from '../../../../enums/path';
import s from '../../login/LoginForm/LoginForm.module.scss';

const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [inProgress, setInProgress] = useState(false);

    const formik = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => registerValidation(values),
        onSubmit: async (values) => {
            try {
                dispatch(setAppErrorAC('good'));
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
                    Sign up
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="standard"
                        id="user_name"
                        label="User Name"
                        className={s.input}
                        {...formik.getFieldProps('user_name')}
                    />
                    {formik.touched.user_name && formik.errors.user_name && (
                        <div style={{ color: 'red' }}>{formik.errors.user_name}</div>
                    )}
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
