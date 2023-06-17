import React, { FC, useEffect } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import { MessageErrorType } from '../../../../../types/MessageErrorType';
import { theme } from '../../../../../styles/theme/theme';

type SendFormModalPropsType = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
};

const SendFormModal: FC<SendFormModalPropsType> = ({ openModal, setOpenModal }) => {
    const userName = 'UserName';
    const users = ['Name'];

    const formik = useFormik({
        initialValues: {
            recipient: '',
            subject: '',
            message: '',
        },
        validate: (values) => {
            const errors: MessageErrorType = {};
            if (!values.recipient) {
                errors.recipient = 'Recipient Required';
            }
            if (values.recipient.length > 20) {
                errors.recipient = 'Name cannot be longer than 20 characters';
            }
            if (!values.subject) {
                errors.subject = 'Subject Required';
            }
            if (values.subject.length > 40) {
                errors.subject = 'Subject length must not exceed 40 characters';
            }
            if (values.message.length > 140) {
                errors.message = 'Message length should not exceed 140 characters';
            }
            if (!values.message) {
                errors.message = 'Message Required';
            }
            return errors;
        },
        onSubmit: (values) => {
            const newObj = {
                senderName: userName,
                recipientName: values.recipient,
                subject: values.subject,
                message: values.message,
            };

            setOpenModal(false);
            formik.resetForm();
        },
    });

    useEffect(() => {}, [formik.values.recipient]);

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal open={openModal} onClose={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    position: 'absolute',
                    width: 500,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(5, 4, 3),
                    outline: 'none',
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={users}
                                filterSelectedOptions
                                value={formik.values.recipient}
                                onChange={(event, value) => formik.setFieldValue('recipient', value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{ marginBottom: theme.spacing(2) }}
                                        label="Получатель"
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
                                Отправить
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default SendFormModal;
