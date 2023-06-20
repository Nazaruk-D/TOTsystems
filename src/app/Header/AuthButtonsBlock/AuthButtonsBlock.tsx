import React from 'react';
import { Box, Button } from '@mui/material';
import { useHeaderButtonsBlockLogic } from '../../../hooks/useHeaderButtonsBlockLogic';
import UserMenu from './UserMenu/UserMenu';
import UserAvatarButton from './UserAvatarButton/UserAvatarButton';

const AuthButtonsBlock = () => {
    const {
        isLoggedIn,
        userData,
        anchorElUser,
        handleOpenUserMenu,
        handleCloseUserMenu,
        navigateToLogin,
        profilePage,
        logoutHandler,
        homePage,
    } = useHeaderButtonsBlockLogic();

    return isLoggedIn ? (
        <Box sx={{ flexGrow: 0 }}>
            <UserAvatarButton userData={userData} handleOpenUserMenu={handleOpenUserMenu} />
            <UserMenu
                handleCloseUserMenu={handleCloseUserMenu}
                anchorElUser={anchorElUser}
                profilePage={profilePage}
                homePage={homePage}
                logoutHandler={logoutHandler}
            />
        </Box>
    ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" sx={{ p: 0 }} component="span" onClick={navigateToLogin}>
                Войти
            </Button>
        </Box>
    );
};

export default AuthButtonsBlock;
