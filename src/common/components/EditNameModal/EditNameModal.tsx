import React, { FC, useEffect } from 'react';
import { Button, CircularProgress, Grid, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import SendIcon from '@mui/icons-material/Send';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { theme } from '../../../styles/theme/theme';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { userIdSelector, userNameSelector } from '../../../store/selectors/userSelector';
import { useUpdateUserNameMutation } from '../../../store/api/userAPISlice';
import { setUserData } from '../../../store/slices/userSlice';

type SendFormModalPropsType = {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
};

const EditNameModal: FC<SendFormModalPropsType> = ({ openModal, setOpenModal }) => {
    const dispatch = useAppDispatch();
    const userName = useAppSelector(userNameSelector);
    const userId = useAppSelector(userIdSelector);
    const [changeName, { data, isSuccess, isLoading, error }] = useUpdateUserNameMutation();

    const formik = useFormik({
        initialValues: {
            name: userName,
        },
        validate: (values) => {
            const errors: { name?: string } = {};
            if (!values.name) {
                errors.name = 'Укажите Ваше имя';
            }

            if (values.name.length < 2) {
                errors.name = 'Имя должно быть неменее 2 символов';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                if (values.name && userId) {
                    await changeName({ userId, userName: values.name });
                }
            } catch {
                dispatch(setAppErrorAC('Ошибка при попытке изменить имя'));
            }
        },
    });
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setUserData(data.data));
            setOpenModal(false);
            formik.resetForm();
        }
    }, [isSuccess, data]);

    const handleClose = () => {
        setOpenModal(false);
    };

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
                                label="Имя"
                                variant="outlined"
                                sx={{ marginBottom: theme.spacing(2) }}
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div style={{ color: 'red' }}>{formik.errors.name}</div>
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
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Изменить'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Modal>
    );
};

export default EditNameModal;
