import React from 'react';
import { Container, Grid } from '@mui/material';
import SideBar from '../../common/components/SideBar/SideBar';
import MessageDetails from './MessageDetails/MessageDetails';

const MessagePage = () => {
    return (
        <Container sx={{ marginTop: '2rem' }}>
            <Grid container justifyContent="space-between">
                <SideBar />
                <MessageDetails />
            </Grid>
        </Container>
    );
};

export default MessagePage;
