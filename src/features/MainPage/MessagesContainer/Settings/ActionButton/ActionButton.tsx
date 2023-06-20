import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import DeleteActionButton from '../DeleteActionButton/DeleteActionButton';
import MoveActionButton from '../MoveActionButton/MoveActionButton';
import MarkReadActionButton from '../MarkReadActionButton/MarkReadActionButton';
import { FoldersEnum } from '../../../../../enums/foldersEnum';
import { setAppErrorAC } from '../../../../../store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux';
import { setMessages } from '../../../../../store/slices/messagesSlice';
import { mainFolders } from '../../../../../common/constant/folders';
import {
    useChangeMessagesFolderMutation,
    useDeleteMessageMutation,
    useFetchMessagesQuery,
    useMarkReadMessagesMutation,
} from '../../../../../store/api/messagesAPISlice';
import { selectorIsActiveFolder, userEmailSelector, userFoldersSelector } from '../../../../../store/selectors/userSelector';
import {
    incomingCheckedIdMessagesSelector,
    outgoingCheckedIdMessagesSelector,
} from '../../../../../store/selectors/messagesSelector';
import useActionButtonLogic from '../../../../../hooks/useActionButtonLogic';

const ActionButton = () => {
    const { handleDeleteMessages, handleMoveToFolder, handleMarkReadMessage, folders } = useActionButtonLogic();

    return (
        <Grid item md={8.5}>
            <DeleteActionButton handleDeleteMessages={handleDeleteMessages} />
            <MoveActionButton handleMoveToFolder={handleMoveToFolder} folders={folders} />
            <MarkReadActionButton handleMarkReadMessage={handleMarkReadMessage} />
        </Grid>
    );
};

export default ActionButton;
