import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendFormModal from './SendFormModal/SendFormModal';

const NewMessageButton = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: '12px', height: '50px', mb: 3 }}
                fullWidth
                onClick={() => setIsActive(!isActive)}
            >
                Новое сообщение
            </Button>
            <SendFormModal openModal={isActive} setOpenModal={setIsActive} />
        </>
    );
};

export default NewMessageButton;
