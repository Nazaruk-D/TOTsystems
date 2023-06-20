import React, { FC } from 'react';
import { Button } from '@mui/material';
import { SnackbarKey } from 'notistack';

type CloseButtonType = {
    closeSnackbar: (key: SnackbarKey) => void;
    key: SnackbarKey;
};

const CloseButton: FC<CloseButtonType> = ({ closeSnackbar, key }) => {
    return (
        <Button size="small" onClick={() => closeSnackbar(key)}>
            X
        </Button>
    );
};

export default CloseButton;
