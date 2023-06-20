import React, { FC, useEffect } from 'react';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { theme } from '../../../../../../styles/theme/theme';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/useRedux';
import { userIdSelector } from '../../../../../../store/selectors/userSelector';
import { useCreateFolderMutation } from '../../../../../../store/api/userAPISlice';
import { setAppErrorAC } from '../../../../../../store/slices/appSlice';

type CreateFolderModalPropsType = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
};

const CreateFolderModal: FC<CreateFolderModalPropsType> = ({ openModal, setOpenModal }) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(userIdSelector);
    const [createFolder, { isSuccess }] = useCreateFolderMutation();

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
        onSubmit: async (values) => {
            try {
                const { nameFolder } = values;
                if (userId) {
                    await createFolder({ nameFolder, userId });
                }
            } catch {
                dispatch(setAppErrorAC('Ошибка при создаа новой папки'));
            }
        },
    });

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (isSuccess) {
            handleClose();
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
                        <Grid item sx={{ width: '100%' }}>
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
            </Grid>
        </Modal>
    );
};

export default CreateFolderModal;
