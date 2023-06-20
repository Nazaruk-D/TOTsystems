import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { useSnackbar } from 'notistack';
import SendFormModal from './SendFormModal/SendFormModal';
import { useAppSelector } from '../../../../hooks/useRedux';
import { userEmailSelector } from '../../../../store/selectors/userSelector';
import { NewMessageWSType } from '../../../../types/NewMessageWSType';
import CloseButton from '../../CloseButton/CloseButton';

const NewMessageButton = () => {
    const userEmail = useAppSelector(userEmailSelector);
    const [isActive, setIsActive] = useState(false);
    const [ws, setWs] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
    const remoteWebSocketBaseUrl = process.env.REACT_APP_REMOTE_WB_BASE_URL;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClickWithAction = useCallback(
        (lastMessage: NewMessageWSType) => {
            enqueueSnackbar(
                <Box>
                    <div>
                        New message from <strong>{lastMessage.sender}</strong>
                    </div>
                    <div>
                        Subject: <strong>{lastMessage.subject}</strong>
                    </div>
                    <div>{lastMessage.message}</div>
                </Box>,
                {
                    variant: 'default',
                    action: (key) => <CloseButton closeSnackbar={closeSnackbar} key={key} />,
                },
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
                console.log(data);
                handleClickWithAction(data);
            });
        }
    }, [ws]);

    useEffect(() => {
        if (!ws) {
            const socket = io(remoteWebSocketBaseUrl!);
            setWs(socket);
        }
        return () => {
            ws?.disconnect();
        };
    }, []);

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: '12px', height: '50px', mb: 3 }}
                fullWidth
                onClick={() => setIsActive(!isActive)}
            >
                Новое сообщение
            </Button>
            <SendFormModal openModal={isActive} setOpenModal={setIsActive} ws={ws!} />
        </>
    );
};

export default NewMessageButton;
