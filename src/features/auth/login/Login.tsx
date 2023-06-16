import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginForm from './LoginForm/LoginForm';
import Introduction from './Introduction/Introduction';
import { useAppSelector } from '../../../hooks/useRedux';
import { Path } from '../../../enums/path';
import s from '../AuthContainer.module.scss';

const Login = () => {
    const navigate = useNavigate();

    return (
        <Box className={s.authContainer}>
            <Introduction />
            <LoginForm />
        </Box>
    );
};

export default Login;
