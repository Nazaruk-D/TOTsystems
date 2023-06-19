import React, { useEffect } from 'react';
import { Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { DeleteOutlined, FolderOutlined, MarkunreadOutlined } from '@mui/icons-material';
import { theme } from '../../../../styles/theme/theme';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { selectorIsActiveFolder, userEmailSelector, userFoldersSelector } from '../../../../store/selectors/userSelector';
import { mainFolders } from '../../../../common/constant/folders';
import {
    incomingCheckedIdMessagesSelector,
    outgoingCheckedIdMessagesSelector,
} from '../../../../store/selectors/messagesSelector';
import { FoldersEnum } from '../../../../enums/foldersEnum';
import { useChangeMessagesFolderMutation, useFetchMessagesQuery } from '../../../../store/api/messagesAPISlice';
import { setAppErrorAC } from '../../../../store/slices/appSlice';
import { setMessages } from '../../../../store/slices/messagesSlice';

const Settings = () => {
    const dispatch = useAppDispatch();
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);
    const userFolders = useAppSelector(userFoldersSelector);
    const incomingIdCheckedMessages = useAppSelector(incomingCheckedIdMessagesSelector);
    const outgoingIdCheckedMessages = useAppSelector(outgoingCheckedIdMessagesSelector);
    const userEmail = useAppSelector(userEmailSelector);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const folders = [...mainFolders, ...userFolders];
    const [changeMessagesFolder] = useChangeMessagesFolderMutation();
    const { data, isSuccess, error } = useFetchMessagesQuery({ userEmail });

    useEffect(() => {
        if (data && !error) {
            const { messages } = data.data;
            if (messages) {
                dispatch(setMessages({ incomingMessages: messages.incoming, outgoingMessages: messages.outgoing }));
            }
        }
        if (isSuccess) {
            setAnchorElUser(null);
        }
    }, [dispatch, data, error, isSuccess]);

    const handleMoveToFolder = async (folder: string) => {
        const isOutgoing = isActiveFolder === FoldersEnum.Outgoing;
        if (isOutgoing) {
            dispatch(setAppErrorAC('Нельзя переместить письма из папки "Отправленные"'));
        }
        if (folder === FoldersEnum.Outgoing) {
            dispatch(setAppErrorAC('Нельзя переместить письма в папку "Отправленные"'));
        }
        if (incomingIdCheckedMessages.length > 0 && !isOutgoing) {
            await changeMessagesFolder({ folder, messagesId: incomingIdCheckedMessages });
        }
    };

    const handleDelete = () => {};

    const handleMarkUnread = () => {};

    return (
        <Grid
            container
            sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: '7px',
                boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Grid item md={8.5}>
                <IconButton sx={{ borderRadius: '5px' }}>
                    <Typography sx={{ mr: 1 }}>Удалить</Typography>
                    <DeleteOutlined />
                </IconButton>
                <IconButton sx={{ borderRadius: '5px' }} onClick={(event) => setAnchorElUser(event.currentTarget)}>
                    <Typography sx={{ mr: 1 }}>Переместить</Typography>
                    <FolderOutlined />
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={() => setAnchorElUser(null)}
                >
                    {folders.map((folder) => (
                        <MenuItem key={folder} onClick={() => handleMoveToFolder(folder)}>
                            <Typography textAlign="center">{folder}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
                <IconButton sx={{ borderRadius: '5px' }}>
                    <Typography sx={{ mr: 1 }}>Отметить прочитанным</Typography>
                    <MarkunreadOutlined />
                </IconButton>
            </Grid>
            <Grid item md={3.5} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {isActiveFolder}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Settings;
