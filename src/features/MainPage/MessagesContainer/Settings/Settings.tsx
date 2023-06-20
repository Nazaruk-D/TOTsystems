import React from 'react';
import { Grid } from '@mui/material';
import { theme } from '../../../../styles/theme/theme';
import FolderName from './FolderName/FolderName';
import ActionButton from './ActionButton/ActionButton';

const Settings = () => {
    return (
        <Grid
            container
            sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: '7px',
                boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <ActionButton />
            <FolderName />
        </Grid>
    );
};

export default Settings;
