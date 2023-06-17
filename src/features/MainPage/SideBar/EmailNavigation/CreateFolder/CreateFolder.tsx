import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CreateFolderModal from './CreateFolderModal/CreateFolderModal';

const CreateFolder = () => {
    const [isActiveModal, setIsActiveModal] = useState(false);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: '12px', width: '90%', margin: '0 auto', mb: 2 }}
                onClick={() => setIsActiveModal(!isActiveModal)}
            >
                Создать папку
            </Button>
            <CreateFolderModal openModal={isActiveModal} setOpenModal={setIsActiveModal} />
        </Box>
    );
};

export default CreateFolder;
