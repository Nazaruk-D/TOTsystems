import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import SideBar from './SideBar/SideBar';
import MessagesTable from './MessagesTable/MessagesTable';

const MainPage = () => {
    return (
        <Container sx={{ mt: '2rem' }}>
            <Grid container justifyContent="space-between">
                <SideBar />
                <MessagesTable />
            </Grid>
        </Container>
    );
};

export default MainPage;
