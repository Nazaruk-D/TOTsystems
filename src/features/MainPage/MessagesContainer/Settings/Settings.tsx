import React from 'react';
import { Box, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { DeleteOutlined, FolderOutlined, MarkunreadOutlined } from '@mui/icons-material';
import { theme } from '../../../../styles/theme/theme';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { selectorIsActiveFolder, userFoldersSelector } from '../../../../store/selectors/userSelector';
import { mainFolders } from '../../../../common/constant/folders';

const Settings = () => {
    const dispatch = useAppDispatch();
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);
    const userFolders = useAppSelector(userFoldersSelector);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const folders = [...mainFolders, ...userFolders];

    const handleDelete = () => {};

    const handleMoveToFolder = () => {};

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
                        <MenuItem onClick={() => {}}>
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
