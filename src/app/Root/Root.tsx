import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import s from './Root.module.scss';
import MessageSnackbar from '../../common/components/MessageSnackbar/MessageSnackbar';
import Header from '../Header/Header';
import { useMeQuery } from '../../store/api/authAPISlice';
import Loader from '../../common/components/Loader/Loader';

const Root = () => {
    return (
        <Box className={s.rootContainer}>
            <Header />
            <Outlet />
            <MessageSnackbar />
        </Box>
    );
};

export default Root;
