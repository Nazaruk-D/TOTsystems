import React, { FC, useEffect } from 'react';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { theme } from '../../../../../../styles/theme/theme';

type CreateFolderModalPropsType = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
};

const CreateFolderModal: FC<CreateFolderModalPropsType> = ({ openModal, setOpenModal }) => {
    const formik = useFormik({
        initialValues: {
            nameFolder: '',
        },
        validate: (values) => {
            const errors: { nameFolder?: string } = {};
            if (!values.nameFolder) {
                errors.nameFolder = 'Введите имя для новой папки';
            }
            if (values.nameFolder.length > 15) {
                errors.nameFolder = 'Длина не должна превышать 15 символов';
            }
            return errors;
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {}, [formik.values.nameFolder]);

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
                            <TextField
                                fullWidth
                                label="Введите имя новой папки"
                                variant="outlined"
                                sx={{ marginBottom: theme.spacing(2) }}
                                {...formik.getFieldProps('nameFolder')}
                            />
                            {formik.touched.nameFolder && formik.errors.nameFolder && (
                                <div style={{ color: 'red' }}>{formik.errors.nameFolder}</div>
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
                                Создать
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateFolderModal;
