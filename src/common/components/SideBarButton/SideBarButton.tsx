import React, { FC } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { getButtonActiveStyle } from '../../../utils/getButtonActiveStyle';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorIsActiveFolder } from '../../../store/selectors/userSelector';

type MainItemButtonPropsType = {
    folderName: string;
    onChangeFolder: (folderName: string) => void;
    icon?: React.ReactNode;
};

const SideBarButton: FC<MainItemButtonPropsType> = ({ onChangeFolder, folderName, icon }) => {
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);

    return (
        <ListItem disablePadding>
            <ListItemButton sx={getButtonActiveStyle(isActiveFolder, folderName)} onClick={() => onChangeFolder(folderName)}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={folderName} />
            </ListItemButton>
        </ListItem>
    );
};

SideBarButton.defaultProps = {
    icon: null,
};

export default SideBarButton;
