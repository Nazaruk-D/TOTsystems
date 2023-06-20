import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { theme } from '../../../../styles/theme/theme';
import EmailFolders from './EmailFolders/EmailFolders';
import CreateFolder from './CreateFolder/CreateFolder';
import { useGetFoldersQuery } from '../../../../store/api/userAPISlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { isLoggedInSelector, userIdSelector } from '../../../../store/selectors/userSelector';
import { setUserFolders } from '../../../../store/slices/userSlice';

const EmailNavigation = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(userIdSelector);
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const { data, error, isSuccess } = useGetFoldersQuery({ userId }, { skip: !isLoggedIn });
    useEffect(() => {
        if (data) {
            dispatch(setUserFolders(data.data.folders));
        }
    }, [data, error, isSuccess]);

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
