import React from 'react';
import dateFormat from 'dateformat';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';
import { MessageType } from '../../../../../types/MessageType';
import { useAppDispatch } from '../../../../../hooks/useRedux';
import { changeMessageStatusAC } from '../../../../../store/slices/messagesSlice';

type MessagePropsType = {
    message: MessageType;
};

const Message: React.FC<MessagePropsType> = ({ message }) => {
    const dispatch = useAppDispatch();
    const onChangeStatusHandler = (id: string, status: boolean) => {
        dispatch(changeMessageStatusAC({ id, status }));
    };
    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: '#f1f1f1',
                '&:hover': {
                    backgroundColor: '#e5e5e5',
                    cursor: 'pointer',
                },
            }}
        >
            <TableCell component="th" scope="row">
                <Checkbox
                    checked={message.isSelected}
                    onChange={() => onChangeStatusHandler(message.id, !message.isSelected)}
                    sx={{ color: message.isSelected ? 'black' : 'gray' }}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {message.user.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {message.subject}
            </TableCell>
            <TableCell component="th" scope="row">
                {message.message}
            </TableCell>
            <TableCell component="th" scope="row">
                {message.created_at}
            </TableCell>
        </TableRow>
    );
};

export default Message;
