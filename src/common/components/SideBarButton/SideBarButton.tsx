import React, { FC, useState } from 'react';
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getButtonActiveStyle } from '../../../utils/getButtonActiveStyle';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorIsActiveFolder } from '../../../store/selectors/userSelector';

type MainItemButtonPropsType = {
    folderName: string;
    onChangeFolder: (folderName: string) => void;
    isBaseFolder: boolean;
    deleteFolder?: (folderName: string) => void;
    icon?: React.ReactNode;
};

const SideBarButton: FC<MainItemButtonPropsType> = ({ onChangeFolder, folderName, icon, deleteFolder, isBaseFolder }) => {
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);
    const [isHover, setIsHover] = useState(false);

    const onDeleteHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (deleteFolder) {
            deleteFolder(folderName);
        }
    };

    return (
        <ListItem disablePadding>
            <ListItemButton
                sx={getButtonActiveStyle(isActiveFolder, folderName)}
                onClick={() => onChangeFolder(folderName)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                {isBaseFolder ? (
                    <ListItemText primary={folderName} />
                ) : (
                    <>
                        <ListItemText primary={folderName} />
                        {isHover && (
                            <IconButton edge="end" aria-label="delete" onClick={onDeleteHandler}>
                                <DeleteIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        )}
                    </>
                )}
            </ListItemButton>
        </ListItem>
    );
};

SideBarButton.defaultProps = {
    icon: null,
    deleteFolder: undefined,
};

export default SideBarButton;
