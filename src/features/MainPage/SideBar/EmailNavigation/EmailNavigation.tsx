import React from 'react';
import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { theme } from '../../../../styles/theme/theme';
import EmailFolders from './EmailFolders/EmailFolders';
import CreateFolder from './CreateFolder/CreateFolder';

const EmailNavigation = () => {
    return (
        <Grid
            sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: '7px',
                boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
            }}
        >
            <EmailFolders />
            <CreateFolder />
        </Grid>
    );
};

export default EmailNavigation;
