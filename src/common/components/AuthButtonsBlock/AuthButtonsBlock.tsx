import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { Path } from '../../../enums/path';
import avatar from '../../png/avatar.png';

const userData = {
    id: '',
    avatar: '',
    name: '',
};

const AuthButtonsBlock = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigateToLogin = () => {
        navigate(Path.Login);
    };

    const profilePage = () => {
        navigate(`/profile/${userData!.id}`);
        handleCloseUserMenu();
    };

    const logoutHandler = async () => {};

    const homePage = () => {
        navigate(Path.Root);
        handleCloseUserMenu();
    };

    return userData ? (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        sx={{ width: '45px', height: '45px', border: '2px solid grey' }}
                        src={userData.avatar || avatar}
                    />
                </IconButton>
            </Tooltip>
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
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={homePage}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={homePage}>
                    <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" sx={{ p: 0 }} component="span" onClick={navigateToLogin}>
                Sign In
            </Button>
        </Box>
    );
};

export default AuthButtonsBlock;