import React from 'react';
import { Grid } from '@mui/material';
import EmailNavigation from './EmailNavigation/EmailNavigation';
import NewMessageButton from './NewMessageButton/NewMessageButton';

const SideBar = () => {
    return (
        <Grid item xs={2.5}>
            <NewMessageButton />
            <EmailNavigation />
        </Grid>
    );
};

export default SideBar;
