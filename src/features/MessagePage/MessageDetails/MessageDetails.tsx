import React from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { theme } from '../../../styles/theme/theme';
import { useAppSelector } from '../../../hooks/useRedux';
import { messageSelector } from '../../../store/selectors/messagesSelector';
import { Path } from '../../../enums/path';

const MessageDetails = () => {
    const navigate = useNavigate();
    const { messageId = '' } = useParams<string>();
    const message = useAppSelector((state) => messageSelector(state, +messageId));

    const handleGoBack = () => {
        navigate(Path.Messages);
    };

    if (!message) {
        return <Typography variant="h6">Сообщение не найдено</Typography>;
    }

    const { recipient, sender, subject, message: messageText, created_at: createdAt } = message;

    return (
        <Grid item sm={9} xs={12} sx={{ width: '80%', height: '100%', mb: 1 }}>
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '7px',
                    boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
                    padding: '1rem',
                }}
            >
                <IconButton onClick={handleGoBack} sx={{ marginBottom: 1 }}>
                    <KeyboardReturnIcon />
                </IconButton>
                <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
                    {subject}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '0.5rem' }}>
                    Кому: {recipient.name} ({recipient.email})
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '0.5rem' }}>
                    От: {sender.name} ({sender.email})
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
                    Отправлено: {dateFormat(createdAt)}
                </Typography>
                <Typography variant="body1">{messageText}</Typography>
            </Box>
        </Grid>
    );
};

export default MessageDetails;
