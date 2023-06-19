import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import dateFormat from 'dateformat';
import { useParams } from 'react-router-dom';
import { theme } from '../../../styles/theme/theme';
import { useAppSelector } from '../../../hooks/useRedux';
import { messageSelector } from '../../../store/selectors/messagesSelector';

const MessageDetails = () => {
    const { messageId = '' } = useParams<string>();
    const message = useAppSelector((state) => messageSelector(state, +messageId));

    if (!message) {
        return <Typography variant="h6">Сообщение не найдено</Typography>;
    }
    const { recipient, sender, subject, message: messageText, created_at: createdAt } = message;
    return (
        <Grid item xs={9} sx={{ width: '80%', height: '100%' }}>
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '7px',
                    boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
                    padding: '1rem',
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
                    {subject}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '0.5rem' }}>
                    Кому: {sender.name} ({sender.email})
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '0.5rem' }}>
                    От: {recipient.name} ({recipient.email})
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
