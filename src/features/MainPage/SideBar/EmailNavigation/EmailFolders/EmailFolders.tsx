import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { selectorIsActiveFolder } from '../../../../../store/selectors/appSelector';
import { FoldersEnum } from '../../../../../enums/foldersEnum';
import { setFolderName } from '../../../../../store/slices/appSlice';

const EmailFolders = () => {
    const dispatch = useAppDispatch();
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);

    const getButtonStyle = (folderName: string) => {
        if (isActiveFolder === folderName) {
            return {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            };
        }
        return {};
    };

    const onChangeFolder = (folderName: string) => {
        dispatch(setFolderName(folderName));
    };

    return (
        <Box>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={getButtonStyle(FoldersEnum.Incoming)}
                            onClick={() => onChangeFolder(FoldersEnum.Incoming)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Входящие" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={getButtonStyle(FoldersEnum.Outgoing)}
                            onClick={() => onChangeFolder(FoldersEnum.Outgoing)}
                        >
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Отправленные" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={getButtonStyle(FoldersEnum.Drafts)}
                            onClick={() => onChangeFolder(FoldersEnum.Drafts)}
                        >
                            <ListItemIcon>
                                <ArchiveOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Черновики" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={getButtonStyle(FoldersEnum.Remote)}
                            onClick={() => onChangeFolder(FoldersEnum.Remote)}
                        >
                            <ListItemText primary="Удаленные" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={getButtonStyle(FoldersEnum.Spam)} onClick={() => onChangeFolder(FoldersEnum.Spam)}>
                            <ListItemText primary="Спам" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
};

export default EmailFolders;
