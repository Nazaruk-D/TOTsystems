import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Path } from '../../../enums/path';
import logo from '../../png/logo.png';
import s from './Logo.module.scss';

const Logo = () => {
    const navigate = useNavigate();
    return (
        <Box className={s.logo} onClick={() => navigate(Path.Messages)}>
            <img src={logo} alt="logo" style={{ height: '40px' }} />
        </Box>
    );
};

export default Logo;
