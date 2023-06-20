import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { selectorIsActiveFolder } from '../../../../../store/selectors/userSelector';

const FolderName = () => {
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);

    return (
        <Grid item md={3.5} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {isActiveFolder}
            </Typography>
        </Grid>
    );
};

export default FolderName;
