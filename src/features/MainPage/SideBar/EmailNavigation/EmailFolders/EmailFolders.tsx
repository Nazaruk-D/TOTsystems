import React from 'react';
import { Box, Divider, List } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { FoldersEnum } from '../../../../../enums/foldersEnum';
import { setFolderName } from '../../../../../store/slices/userSlice';
import { userFoldersSelector } from '../../../../../store/selectors/userSelector';
import SideBarButton from '../../../../../common/components/SideBarButton/SideBarButton';

const EmailFolders = () => {
    const dispatch = useAppDispatch();
    const userFolders = useAppSelector(userFoldersSelector);

    const onChangeFolder = (folderName: string) => {
        dispatch(setFolderName(folderName));
    };

    return (
        <Box>
            <List>
                <SideBarButton folderName={FoldersEnum.Incoming} onChangeFolder={onChangeFolder} icon={<InboxIcon />} />
                <SideBarButton folderName={FoldersEnum.Outgoing} onChangeFolder={onChangeFolder} icon={<DraftsIcon />} />
                <SideBarButton folderName={FoldersEnum.Drafts} onChangeFolder={onChangeFolder} icon={<ArchiveOutlinedIcon />} />
            </List>
            <Divider />
            <List>
                <SideBarButton folderName={FoldersEnum.Remote} onChangeFolder={onChangeFolder} />
                <SideBarButton folderName={FoldersEnum.Spam} onChangeFolder={onChangeFolder} />
                {userFolders.map((folder) => (
                    <SideBarButton key={folder} folderName={folder} onChangeFolder={onChangeFolder} />
                ))}
            </List>
        </Box>
    );
};

export default EmailFolders;
