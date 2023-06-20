import React from 'react';
import { Grid } from '@mui/material';
import DeleteActionButton from './DeleteActionButton/DeleteActionButton';
import MoveActionButton from './MoveActionButton/MoveActionButton';
import MarkReadActionButton from './MarkReadActionButton/MarkReadActionButton';
import useActionsButtonLogic from '../../../../../hooks/useActionsButtonLogic';

const ActionButton = () => {
    const { handleDeleteMessages, handleMoveToFolder, handleMarkReadMessage, folders, checkedMessagesId, isOutgoing } =
        useActionsButtonLogic();

    return (
        <Grid item md={8.5}>
            {checkedMessagesId.length > 0 && (
                <>
                    <DeleteActionButton handleDeleteMessages={handleDeleteMessages} />
                    {!isOutgoing && (
                        <>
                            <MoveActionButton handleMoveToFolder={handleMoveToFolder} folders={folders} />
                            <MarkReadActionButton handleMarkReadMessage={handleMarkReadMessage} />
                        </>
                    )}
                </>
            )}
        </Grid>
    );
};

export default ActionButton;
