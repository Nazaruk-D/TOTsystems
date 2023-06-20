import React, { FC } from 'react';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

type DeleteActionButtonType = {
    handleDeleteMessages: () => void;
};

const DeleteActionButton: FC<DeleteActionButtonType> = ({ handleDeleteMessages }) => {
    return (
        <IconButton sx={{ borderRadius: '5px' }} onClick={handleDeleteMessages}>
            <Typography sx={{ mr: 1 }}>Удалить</Typography>
            <DeleteOutlined />
        </IconButton>
    );
};

export default DeleteActionButton;
