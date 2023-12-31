import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useSnackbar } from 'notistack';
import SendMessageFormModal from './SendFormModal/SendMessageFormModal';
import { useAppSelector } from '../../../../hooks/useRedux';
import { isLoggedInSelector, userEmailSelector } from '../../../../store/selectors/userSelector';
import { useLazyFetchMessagesQuery } from '../../../../store/api/messagesAPISlice';
import { NewMessageWSType } from '../../../../types/NewMessageWSType';

const NewMessageButton = () => {
    const userEmail = useAppSelector(userEmailSelector);
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const [isActive, setIsActive] = useState(false);
    const [ws, setWs] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
    const remoteWebSocketBaseUrl = process.env.REACT_APP_REMOTE_WB_BASE_URL;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [getMessages] = useLazyFetchMessagesQuery();

    const handleClickWithAction = useCallback(
        (lastMessage: NewMessageWSType) => {
            enqueueSnackbar(
                <Box>
                    <Box>
                        New message from <strong>{lastMessage.sender}</strong>
                    </Box>
                    <Box>
                        Subject: <strong>{lastMessage.subject}</strong>
                    </Box>
                    <Box>{lastMessage.message}</Box>
                </Box>,
            );
        },
        [enqueueSnackbar, closeSnackbar],
    );

    useEffect(() => {
        if (ws) {
            ws.emit('subscribe', userEmail);
            return () => {
                ws.emit('unsubscribe', userEmail);
            };
        }
        return undefined;
    }, [ws, userEmail]);

    useEffect(() => {
        if (ws) {
            ws.on('newMessage', (data) => {
                getMessages({ userEmail });
                handleClickWithAction(data);
            });
        }
    }, [ws]);

    useEffect(() => {
        if (!ws && isLoggedIn) {
            const socket = io(remoteWebSocketBaseUrl!);
            setWs(socket);
        }
        return () => {
            ws?.disconnect();
        };
    }, [isLoggedIn]);

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: '12px', height: '50px', mb: 2 }}
                fullWidth
                onClick={() => setIsActive(!isActive)}
            >
                Новое сообщение
            </Button>
            <SendMessageFormModal openModal={isActive} setOpenModal={setIsActive} ws={ws!} />
        </>
    );
};

export default NewMessageButton;
