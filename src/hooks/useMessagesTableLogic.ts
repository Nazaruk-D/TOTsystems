import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { selectorIsActiveFolder } from '../store/selectors/userSelector';
import { filteredIncomingMessagesSelector } from '../store/selectors/messagesSelector';
import { MessageType } from '../types/MessageType';
import { changeAllMessagesStatus } from '../store/slices/messagesSlice';

export const useMessagesTableLogic = () => {
    const dispatch = useAppDispatch();
    const selectedFolder = useAppSelector(selectorIsActiveFolder);
    const filteredMessages = useAppSelector((state) => filteredIncomingMessagesSelector(state, selectedFolder));
    const [isAllMessages, setIsAllMessages] = useState(false);
    const [paginationPage, setPaginationPage] = useState(0);
    const paginationRowsPerPage = 9;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPaginationPage(newPage);
    };

    const slicedMessages: MessageType[] = filteredMessages.slice(
        paginationPage * paginationRowsPerPage,
        paginationPage * paginationRowsPerPage + paginationRowsPerPage,
    );

    const onChangeHandler = () => {
        const ids = slicedMessages.map((message) => message.id);
        dispatch(changeAllMessagesStatus({ ids, status: !isAllMessages }));
        setIsAllMessages(!isAllMessages);
    };

    useEffect(() => {
        setIsAllMessages(false);
    }, [selectedFolder]);

    return {
        isAllMessages,
        paginationPage,
        slicedMessages,
        paginationRowsPerPage,
        handleChangePage,
        onChangeHandler,
    };
};
