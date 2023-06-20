import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginForm from './LoginForm/LoginForm';
import Introduction from './Introduction/Introduction';
import s from '../AuthContainer.module.scss';
import { Path } from '../../../enums/path';
import { useAppSelector } from '../../../hooks/useRedux';
import { isLoggedInSelector } from '../../../store/selectors/userSelector';

const Login = () => {
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isLoggedIn);
        if (isLoggedIn) {
            navigate(Path.Messages);
        }
    }, [isLoggedIn]);

    return (
        <Box className={s.authContainer}>
            <Introduction />
            <LoginForm />
        </Box>
    );
};

export default Login;
