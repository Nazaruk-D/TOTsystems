import React, { FC } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';

type UserMenuType = {
    anchorElUser: HTMLElement | null;
    handleCloseUserMenu: () => void;
    profilePage: () => void;
    homePage: () => void;
    logoutHandler: () => void;
};

const UserMenu: FC<UserMenuType> = ({ anchorElUser, handleCloseUserMenu, profilePage, homePage, logoutHandler }) => {
    return (
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
            <MenuItem onClick={profilePage}>
                <Typography textAlign="center">Профиль</Typography>
            </MenuItem>
            <MenuItem onClick={homePage}>
                <Typography textAlign="center">Главная</Typography>
            </MenuItem>
            <MenuItem onClick={logoutHandler}>
                <Typography textAlign="center">Выйти</Typography>
            </MenuItem>
        </Menu>
    );
};

export default UserMenu;
