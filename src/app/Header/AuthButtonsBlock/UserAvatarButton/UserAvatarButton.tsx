import React, { FC } from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import avatar from '../../../../common/png/avatar.png';
import { UserType } from '../../../../types/UserType';

type UserAvatarButtonType = {
    userData: UserType;
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
};

const UserAvatarButton: FC<UserAvatarButtonType> = ({ userData, handleOpenUserMenu }) => {
    return (
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                    alt="Remy Sharp"
                    sx={{ width: '45px', height: '45px', border: '2px solid grey' }}
                    src={userData && userData.avatar ? userData.avatar : avatar}
                />
            </IconButton>
        </Tooltip>
    );
};

export default UserAvatarButton;
