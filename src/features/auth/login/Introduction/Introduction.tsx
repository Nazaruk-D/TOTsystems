import React from 'react';
import { Box, Typography } from '@mui/material';
import s from './Introduction.module.scss';

const Introduction = () => {
    return (
        <Box className={s.introductionContainer}>
            <Box>
                <Typography variant="h1" className={s.title}>
                    Mailbox.
                </Typography>
            </Box>
        </Box>
    );
};

export default Introduction;
