import React from 'react';
import { Container, Grid } from '@mui/material';
import SideBar from './SideBar/SideBar';
import MessagesTable from './MessagesContainer/MessagesTable/MessagesTable';
import MessagesContainer from './MessagesContainer/MessagesContainer';

const MainPage = () => {
    return (
        <Container sx={{ mt: '2rem' }}>
            <Grid container justifyContent="space-between">
                <SideBar />
                <MessagesContainer />
            </Grid>
        </Container>
    );
};

export default MainPage;
