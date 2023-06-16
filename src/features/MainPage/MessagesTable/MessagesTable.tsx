import React, { useState } from 'react';
import {
    Grid,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Checkbox,
} from '@mui/material';
import { theme } from '../../../styles/theme/theme';
import Message from './Message/Message';
import SendFormModal from '../../../common/components/SendFormModal/SendFormModal';
import { MessageType } from '../../../types/MessageType';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { messagesInsideSelector } from '../../../store/selectors/messagesSelector';
import { changeAllMessagesStatusAC } from '../../../store/slices/messagesSlice';

const MessagesTable = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(messagesInsideSelector);
    const [isAllMessages, setIsAllMessages] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [paginationPage, setPaginationPage] = useState(0);
    const MESSAGE_PER_PAGE = 9;
    const paginationRowsPerPage = MESSAGE_PER_PAGE;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPaginationPage(newPage);
    };

    const slicedMessages = messages.slice(
        paginationPage * paginationRowsPerPage,
        paginationPage * paginationRowsPerPage + paginationRowsPerPage,
    );

    const onChangeHandler = () => {
        const ids = slicedMessages.map((message) => message.id);
        dispatch(changeAllMessagesStatusAC({ ids, status: !isAllMessages }));
        setIsAllMessages(!isAllMessages);
    };

    return (
        <Grid
            item
            xs={9}
            sx={{
                width: '80%',
                height: '100%',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '7px',
                boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
            }}
        >
            <TableContainer sx={{ width: '100%', mt: 0.5 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#FFF' }}>
                            <TableCell width="10%">
                                <Checkbox checked={isAllMessages} onChange={onChangeHandler} />
                            </TableCell>
                            <TableCell style={{ fontWeight: '600' }} width="20%">
                                Отправитель
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width="25%">
                                Тема письма
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width="25%">
                                Сообщение
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: '600' }} width="20%">
                                Дата
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {messages.length ? (
                        <TableBody>
                            {slicedMessages.map((message) => (
                                <Message key={message.id} message={message} />
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell style={{ fontWeight: '600' }} width="10%">
                                    {' '}
                                </TableCell>
                                <TableCell style={{ fontWeight: '600' }} width="30%">
                                    `You don&apos;t have new emails`
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[paginationRowsPerPage]}
                component="div"
                count={messages.length}
                rowsPerPage={paginationRowsPerPage}
                page={paginationPage}
                onPageChange={handleChangePage}
            />
            <SendFormModal openModal={openModal} setOpenModal={setOpenModal} />
        </Grid>
    );
};

export default MessagesTable;
