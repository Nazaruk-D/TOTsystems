import React, { FC, useEffect } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Grid, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import SendIcon from '@mui/icons-material/Send';
import { MessageErrorType } from '../../../../../types/MessageErrorType';
import { theme } from '../../../../../styles/theme/theme';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { usersSelector } from '../../../../../store/selectors/messagesSelector';
import { userEmailSelector } from '../../../../../store/selectors/userSelector';
import { useSendMessageMutation } from '../../../../../store/api/messagesAPISlice';
import { setAppErrorAC } from '../../../../../store/slices/appSlice';

type SendFormModalPropsType = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    ws: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const SendMessageFormModal: FC<SendFormModalPropsType> = ({ openModal, setOpenModal, ws }) => {
    const dispatch = useAppDispatch();
    const sender = useAppSelector(userEmailSelector);
    const users = useAppSelector(usersSelector);
    const usersEmail = users.map((user) => user.email);
    const [sendMessage, { isSuccess, isLoading, error }] = useSendMessageMutation();

    const formik = useFormik({
        initialValues: {
            recipient: '',
            subject: '',
            message: '',
        },
        validate: (values) => {
            const errors: MessageErrorType = {};
            if (!values.recipient) {
                errors.recipient = 'Укажите email получателя';
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.recipient)) {
                errors.recipient = 'Неверно указан email получателя';
            }
            if (!values.subject) {
                errors.subject = 'Укажите тему письма';
            }
            if (values.subject.length > 40) {
                errors.subject = 'Тема не должна превышать 40 символов';
            }
            if (values.message.length > 140) {
                errors.message = 'Длинна сообщения не должна превышать 140 символов';
            }
            if (!values.message) {
                errors.message = 'Напишите Ваше сообщение';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const { recipient, subject, message } = values;
                const sendData = { sender, recipient, subject, message };
                await sendMessage(sendData);
                ws.emit('newMessage', { recipientEmail: recipient, message: sendData });
            } catch {
                dispatch(setAppErrorAC('Ошибка при отправке сообщения'));
            }
        },
    });

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (error) {
            if ('data' in error) {
                const errorData = error.data as { message: string };
                dispatch(setAppErrorAC(errorData.message));
            }
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            setOpenModal(false);
            formik.resetForm();
        }
    }, [isSuccess]);

    return (
        <Modal open={openModal} onClose={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid
                item
                sx={{
                    position: 'absolute',
                    width: 500,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(5, 4, 3),
                    outline: 'none',
                }}
                xs={11}
                sm={5}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={usersEmail}
                                filterSelectedOptions
                                value={formik.values.recipient}
                                onChange={(event, value) => formik.setFieldValue('recipient', value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{ marginBottom: theme.spacing(2) }}
                                        label="Кому"
                                        variant="outlined"
                                        {...formik.getFieldProps('recipient')}
                                    />
                                )}
                            />
                            {formik.touched.recipient && formik.errors.recipient && (
                                <div style={{ color: 'red' }}>{formik.errors.recipient}</div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Тема"
                                variant="outlined"
                                sx={{ marginBottom: theme.spacing(2) }}
                                {...formik.getFieldProps('subject')}
                            />
                            {formik.touched.subject && formik.errors.subject && (
                                <div style={{ color: 'red' }}>{formik.errors.subject}</div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Сообщение"
                                variant="outlined"
                                multiline
                                rows={4}
                                sx={{ marginBottom: theme.spacing(2) }}
                                {...formik.getFieldProps('message')}
                            />
                            {formik.touched.message && formik.errors.message && (
                                <div style={{ color: 'red' }}>{formik.errors.message}</div>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon />}
                                disabled={!(formik.isValid && formik.dirty)}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Отправить'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Modal>
    );
};

export default SendMessageFormModal;
