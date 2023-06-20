import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Path } from '../../../enums/path';
import logo from '../../png/logo.png';

const Logo = () => {
    const navigate = useNavigate();
    return (
        <Box onClick={() => navigate(Path.Messages)} sx={{ marginBottom: '10px', marginRight: '73px', cursor: 'pointer' }}>
            <img src={logo} alt="logo" style={{ height: '40px' }} />
        </Box>
    );
};

export default Logo;
