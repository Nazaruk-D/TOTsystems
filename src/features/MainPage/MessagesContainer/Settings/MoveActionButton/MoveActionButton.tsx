import React, { FC } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FolderOutlined } from '@mui/icons-material';
import { FoldersEnum } from '../../../../../enums/foldersEnum';

type MoveActionButtonType = {
    folders: string[];
    handleMoveToFolder: (folder: string) => void;
};

const MoveActionButton: FC<MoveActionButtonType> = ({ folders, handleMoveToFolder }) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const onClickHandler = (folder: string) => {
        handleMoveToFolder(folder);
        setAnchorElUser(null);
    };

    return (
        <>
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
                {folders
                    .filter((folder) => folder !== FoldersEnum.Outgoing)
                    .map((folder) => (
                        <MenuItem key={folder} onClick={() => onClickHandler(folder)}>
                            <Typography textAlign="center">{folder}</Typography>
                        </MenuItem>
                    ))}
            </Menu>
        </>
    );
};

export default MoveActionButton;
