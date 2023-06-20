import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import MessagesContainer from './MessagesContainer/MessagesContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { isLoggedInSelector, userEmailSelector } from '../../store/selectors/userSelector';
import { Path } from '../../enums/path';
import SideBar from '../../common/components/SideBar/SideBar';
import { useFetchMessagesQuery } from '../../store/api/messagesAPISlice';
import { setMessages } from '../../store/slices/messagesSlice';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const userEmail = useAppSelector(userEmailSelector);
    const { data, error } = useFetchMessagesQuery({ userEmail }, { skip: !isLoggedIn });

    useEffect(() => {
        if (data && !error) {
            const { messages } = data.data;
            if (messages) {
                dispatch(setMessages({ incomingMessages: messages.incoming, outgoingMessages: messages.outgoing }));
            }
        }
    }, [dispatch, data, error]);

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
