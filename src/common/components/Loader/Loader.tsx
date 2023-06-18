import React from 'react';
import { Box, CircularProgress, Modal } from '@mui/material';

const Loader = () => {
    return (
        <Modal open sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        </Modal>
    );
};

export default Loader;
