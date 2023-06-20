import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import s from './Root.module.scss';
import MessageSnackbar from '../../common/components/MessageSnackbar/MessageSnackbar';
import Header from '../Header/Header';
import { useAppSelector } from '../../hooks/useRedux';
import { isLoggedInSelector } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';

const Root = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(isLoggedInSelector);

    useEffect(() => {
        if (isLoggedIn) {
            navigate(Path.Messages);
        }
    }, []);

    return (
        <Box className={s.rootContainer}>
            <Header />
            <Outlet />
            <MessageSnackbar />
        </Box>
    );
};

export default Root;
