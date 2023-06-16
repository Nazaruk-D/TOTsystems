import React from 'react';
import {
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { theme } from '../../../styles/theme/theme';

const SideBar = () => {
    return (
        <Grid
            item
            xs={2.5}
            sx={{
                backgroundColor: theme.palette.primary.main,
                height: '100%',
                borderRadius: '7px',
                boxShadow: `0 0 5px rgba(100,100,100,0.3)`,
            }}
        >
            <Box>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Входящие" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Отправленные" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
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
                            <ListItemButton>
                                <ListItemText primary="Удаленные" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="Спам" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Button variant="contained" color="secondary" sx={{ fontSize: '12px', width: '90%', margin: '0 auto' }}>
                    Создать папку
                </Button>
            </Box>
        </Grid>
    );
};

export default SideBar;
