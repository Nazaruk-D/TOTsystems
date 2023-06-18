import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { DeleteOutlined, FolderOutlined, MarkunreadOutlined } from '@mui/icons-material';
import { theme } from '../../../../styles/theme/theme';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { selectorIsActiveFolder } from '../../../../store/selectors/userSelector';

const Settings = () => {
    const dispatch = useAppDispatch();
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);
    const handleDelete = () => {
        // Обработчик удаления выбранных писем
    };

    const handleMoveToFolder = () => {
        // Обработчик перемещения выбранных писем в папку
    };

    const handleMarkUnread = () => {
        // Обработчик отметки выбранных писем как непрочитанных
    };

    return (
        <Box
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
            <Box>
                <IconButton>
                    <DeleteOutlined />
                </IconButton>
                <IconButton>
                    <FolderOutlined />
                </IconButton>
                <IconButton>
                    <MarkunreadOutlined />
                </IconButton>
            </Box>
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {isActiveFolder}
                </Typography>
            </Box>
        </Box>
    );
};

export default Settings;
