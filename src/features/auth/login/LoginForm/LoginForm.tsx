import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useRedux';
import { setAppErrorAC } from '../../../../store/slices/appSlice';
import { loginValidation } from '../loginValidation';
import s from './LoginForm.module.scss';
import { Path } from '../../../../enums/path';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [inProgress, setInProgress] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => loginValidation(values),
        onSubmit: async (values) => {
            try {
                dispatch(setAppErrorAC('good'));
            } catch (err) {
                dispatch(setAppErrorAC('Unknown error occurred'));
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
                    Sign in
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="standard"
                        id="email"
                        label="Email"
                        autoComplete="email"
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
                        autoComplete="current-password"
                        className={s.input}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: '20px' }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        {inProgress ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
                    </Button>
                </form>
                <Grid container spacing={2} sx={{ mt: '10px' }}>
                    <Grid item xs={5}>
                        <hr />
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'center' }}>
                        or
                    </Grid>
                    <Grid item xs={5}>
                        <hr />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: '20px' }} onClick={() => navigate(Path.Register)}>
                    Sign up
                </Button>
            </Box>
        </Paper>
    );
};

export default LoginForm;