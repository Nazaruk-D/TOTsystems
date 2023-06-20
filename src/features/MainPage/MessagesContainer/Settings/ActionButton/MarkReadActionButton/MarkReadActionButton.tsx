import React, { FC } from 'react';
import { IconButton, Typography } from '@mui/material';
import { MarkunreadOutlined } from '@mui/icons-material';

type MarkReadActionButtonType = {
    handleMarkReadMessage: () => void;
};

const MarkReadActionButton: FC<MarkReadActionButtonType> = ({ handleMarkReadMessage }) => {
    return (
        <IconButton sx={{ borderRadius: '5px' }} onClick={handleMarkReadMessage}>
            <Typography sx={{ mr: 1 }}>Отметить прочитанным</Typography>
            <MarkunreadOutlined />
        </IconButton>
    );
};

export default MarkReadActionButton;
