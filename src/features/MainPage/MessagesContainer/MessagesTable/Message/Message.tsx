import React from 'react';
import dateFormat from 'dateformat';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';
import { MessageType } from '../../../../../types/MessageType';
import { useAppDispatch } from '../../../../../hooks/useRedux';
import { changeMessageStatus } from '../../../../../store/slices/messagesSlice';

type MessagePropsType = {
    message: MessageType;
};

const Message: React.FC<MessagePropsType> = ({ message }) => {
    const dispatch = useAppDispatch();
    const onChangeStatusHandler = (id: number, status: boolean) => {
        dispatch(changeMessageStatus({ id, status }));
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
                    checked={message.is_selected}
                    onChange={() => onChangeStatusHandler(message.id, !message.is_selected)}
                    sx={{ color: message.is_selected ? 'black' : 'gray' }}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {message.sender.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {message.subject}
            </TableCell>
            <TableCell component="th" scope="row">
                {message.message}
            </TableCell>
            <TableCell component="th" scope="row">
                {dateFormat(message.created_at)}
            </TableCell>
        </TableRow>
    );
};

export default Message;
