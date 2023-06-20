import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, List } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { FoldersEnum } from '../../../../../enums/foldersEnum';
import { setFolderName } from '../../../../../store/slices/userSlice';
import { userFoldersSelector, userIdSelector } from '../../../../../store/selectors/userSelector';
import { clearAllMessagesStatus } from '../../../../../store/slices/messagesSlice';
import { useDeleteFolderMutation } from '../../../../../store/api/userAPISlice';
import SideBarButton from '../../../SideBarButton/SideBarButton';
import { Path } from '../../../../../enums/path';
import { setSearchValue } from '../../../../../store/slices/searchSlice';

const EmailFolders = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userFolders = useAppSelector(userFoldersSelector);
    const userId = useAppSelector(userIdSelector);
    const [deleteFolder] = useDeleteFolderMutation();

    const onChangeFolder = (folderName: string) => {
        dispatch(setFolderName(folderName));
        dispatch(clearAllMessagesStatus());
        dispatch(setSearchValue(''));
        if (!window.location.href.includes(Path.Messages)) {
            navigate(Path.Messages);
        }
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
                {userFolders &&
                    userFolders.map((folder) => (
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
