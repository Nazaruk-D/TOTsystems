import React from 'react';
import { Box, Divider, List } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { FoldersEnum } from '../../../../../enums/foldersEnum';
import { setFolderName } from '../../../../../store/slices/userSlice';
import { userFoldersSelector, userIdSelector } from '../../../../../store/selectors/userSelector';
import SideBarButton from '../../../../../common/components/SideBarButton/SideBarButton';
import { clearAllMessagesStatus } from '../../../../../store/slices/messagesSlice';
import { useDeleteFolderMutation } from '../../../../../store/api/userAPISlice';

const EmailFolders = () => {
    const dispatch = useAppDispatch();
    const userFolders = useAppSelector(userFoldersSelector);
    const userId = useAppSelector(userIdSelector);
    const [deleteFolder] = useDeleteFolderMutation();

    const onChangeFolder = (folderName: string) => {
        dispatch(setFolderName(folderName));
        dispatch(clearAllMessagesStatus());
    };

    const deleteFolderHandler = (nameFolder: string) => {
        if (userId) {
            deleteFolder({ userId, nameFolder });
        }
    };

    return (
        <Box>
            <List>
                <SideBarButton
                    folderName={FoldersEnum.Incoming}
                    onChangeFolder={onChangeFolder}
                    icon={<InboxIcon />}
                    isBaseFolder
                />
                <SideBarButton
                    folderName={FoldersEnum.Outgoing}
                    onChangeFolder={onChangeFolder}
                    icon={<DraftsIcon />}
                    isBaseFolder
                />
                <SideBarButton
                    folderName={FoldersEnum.Drafts}
                    onChangeFolder={onChangeFolder}
                    icon={<ArchiveOutlinedIcon />}
                    isBaseFolder
                />
            </List>
            <Divider />
            <List>
                <SideBarButton folderName={FoldersEnum.Remote} onChangeFolder={onChangeFolder} isBaseFolder />
                <SideBarButton folderName={FoldersEnum.Spam} onChangeFolder={onChangeFolder} isBaseFolder />
                {userFolders.map((folder) => (
                    <SideBarButton
                        key={folder}
                        folderName={folder}
                        onChangeFolder={onChangeFolder}
                        isBaseFolder={false}
                        deleteFolder={deleteFolderHandler}
                    />
                ))}
            </List>
        </Box>
    );
};

export default EmailFolders;
