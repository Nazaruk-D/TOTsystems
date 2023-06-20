import React from 'react';
import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { theme } from '../../../../styles/theme/theme';
import Message from './Message/Message';
import { useMessagesTableLogic } from '../../../../hooks/useMessagesTableLogic';

const MessagesTable = () => {
    const { isAllMessages, paginationPage, slicedMessages, paginationRowsPerPage, handleChangePage, onChangeHandler } =
        useMessagesTableLogic();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: '7px',
                boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
            }}
        >
            <TableContainer sx={{ width: '100%' }}>
                <Table sx={{ minWidth: 650, mt: 0.5 }} aria-label="simple table">
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
                    {slicedMessages.length > 0 ? (
                        <TableBody>
                            {slicedMessages.map((message) => (
                                <Message key={message.id} message={message} />
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { mt: 1 } }}>
                                <TableCell colSpan={5} align="center" style={{ fontWeight: '500' }}>
                                    Эта папка пуста
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[paginationRowsPerPage]}
                component="div"
                count={slicedMessages.length}
                rowsPerPage={paginationRowsPerPage}
                page={paginationPage}
                onPageChange={handleChangePage}
            />
        </Box>
    );
};

export default MessagesTable;
