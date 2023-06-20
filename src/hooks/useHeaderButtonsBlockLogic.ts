import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';
import { isLoggedInSelector, userDataSelector } from '../store/selectors/userSelector';
import { useLogoutMutation } from '../store/api/authAPISlice';
import { Path } from '../enums/path';
import { clearUserData, setIsLoggedIn } from '../store/slices/userSlice';
import { setUsers } from '../store/slices/messagesSlice';

export const useHeaderButtonsBlockLogic = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const userData = useAppSelector(userDataSelector);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [logout] = useLogoutMutation();

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

    const logoutHandler = async () => {
        await logout({});
        dispatch(setIsLoggedIn(false));
        dispatch(clearUserData());
        dispatch(setUsers([]));
    };

    const homePage = () => {
        navigate(Path.Messages);
        handleCloseUserMenu();
    };

    useEffect(() => {
        handleCloseUserMenu();
    }, [location]);

    return {
        isLoggedIn,
        userData,
        anchorElUser,
        handleOpenUserMenu,
        handleCloseUserMenu,
        navigateToLogin,
        profilePage,
        logoutHandler,
        homePage,
    };
};
