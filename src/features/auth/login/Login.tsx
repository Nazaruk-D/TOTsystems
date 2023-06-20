import React from 'react';
import { Box } from '@mui/material';
import LoginForm from './LoginForm/LoginForm';
import Introduction from './Introduction/Introduction';
import s from '../AuthContainer.module.scss';

const Login = () => {
    return (
        <Box className={s.authContainer}>
            <Introduction />
            <LoginForm />
        </Box>
    );
};

export default Login;
