import React from 'react';
import dateFormat from 'dateformat';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MessageType } from '../../../../../types/MessageType';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { changeMessageStatus } from '../../../../../store/slices/messagesSlice';
import { selectorIsActiveFolder } from '../../../../../store/selectors/userSelector';
import { FoldersEnum } from '../../../../../enums/foldersEnum';
import { useMarkReadMessagesMutation } from '../../../../../store/api/messagesAPISlice';

type MessagePropsType = {
    message: MessageType;
};

const Message: React.FC<MessagePropsType> = ({ message }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const activeFolder = useAppSelector(selectorIsActiveFolder);
    const [readMessage] = useMarkReadMessagesMutation();
    const isUnread = !message.is_read;
    const unreadStyleText = { fontWeight: isUnread && activeFolder !== FoldersEnum.Outgoing ? '800' : '400' };
    const truncatedMessage = `${message.message.slice(0, 15)}...`;

    const onChangeStatusHandler = (id: number, status: boolean) => {
        dispatch(changeMessageStatus({ id, status }));
    };

    const onClickHandler = () => {
        readMessage({ messagesId: [message.id] });
        navigate(`/message/${message.id}`);
    };

    const onCheckboxClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
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
            onClick={onClickHandler}
        >
            <TableCell component="th" scope="row">
                <Checkbox
                    checked={message.is_selected}
                    onChange={() => onChangeStatusHandler(message.id, !message.is_selected)}
                    onClick={onCheckboxClickHandler}
                    sx={{ color: message.is_selected ? 'black' : 'gray' }}
                />
            </TableCell>
            <TableCell component="th" scope="row" sx={unreadStyleText}>
                {message.sender.name}
            </TableCell>
            <TableCell component="th" scope="row" sx={unreadStyleText}>
                {message.subject}
            </TableCell>
            <TableCell component="th" scope="row" sx={unreadStyleText}>
                {truncatedMessage}
            </TableCell>
            <TableCell component="th" scope="row" sx={unreadStyleText}>
                {dateFormat(message.created_at)}
            </TableCell>
        </TableRow>
    );
};

export default Message;
