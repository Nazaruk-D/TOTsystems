import React from 'react';
import { Grid } from '@mui/material';
import MessagesTable from './MessagesTable/MessagesTable';
import Settings from './Settings/Settings';

const MessagesContainer = () => {
    return (
        <Grid item xs={12} sm={9} sx={{ width: '80%', height: '100%' }}>
            <Settings />
            <MessagesTable />
        </Grid>
    );
};

export default MessagesContainer;
