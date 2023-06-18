import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import SideBar from './SideBar/SideBar';
import MessagesContainer from './MessagesContainer/MessagesContainer';
import { useAppSelector } from '../../hooks/useRedux';
import { isLoggedInSelector } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';

const MainPage = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(isLoggedInSelector);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(Path.Login);
        }
    }, [isLoggedIn]);

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
