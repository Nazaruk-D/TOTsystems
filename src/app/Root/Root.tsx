import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import s from './Root.module.scss';
import MessageSnackbar from '../../common/components/MessageSnackbar/MessageSnackbar';
import Header from '../Header/Header';

const Root = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/messages');
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
