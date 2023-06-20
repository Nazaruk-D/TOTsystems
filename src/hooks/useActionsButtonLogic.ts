import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { selectorIsActiveFolder, userFoldersSelector } from '../store/selectors/userSelector';
import { incomingCheckedIdMessagesSelector, outgoingCheckedIdMessagesSelector } from '../store/selectors/messagesSelector';
import { mainFolders } from '../common/constant/folders';
import {
    useChangeMessagesFolderMutation,
    useDeleteMessageMutation,
    useMarkReadMessagesMutation,
} from '../store/api/messagesAPISlice';
import { FoldersEnum } from '../enums/foldersEnum';
import { setAppErrorAC } from '../store/slices/appSlice';

const useActionsButtonLogic = () => {
    const dispatch = useAppDispatch();
    const userFolders = useAppSelector(userFoldersSelector);
    const incomingIdCheckedMessages = useAppSelector(incomingCheckedIdMessagesSelector);
    const outgoingIdCheckedMessages = useAppSelector(outgoingCheckedIdMessagesSelector);
    const isActiveFolder = useAppSelector(selectorIsActiveFolder);
    const folders = userFolders ? [...mainFolders, ...userFolders] : mainFolders;
    const [changeMessagesFolder, { error }] = useChangeMessagesFolderMutation();
    const [deleteMessages] = useDeleteMessageMutation();
    const [markMessages] = useMarkReadMessagesMutation();
    const isOutgoing = isActiveFolder === FoldersEnum.Outgoing;
    const checkedMessagesId = [...incomingIdCheckedMessages, ...outgoingIdCheckedMessages];

    const handleMoveToFolder = async (folder: string) => {
        if (folder === FoldersEnum.Outgoing) {
            dispatch(setAppErrorAC('Нельзя переместить письма в папку "Отправленные"'));
            return;
        }
        if (incomingIdCheckedMessages.length > 0 && !isOutgoing) {
            await changeMessagesFolder({ folder, messagesId: incomingIdCheckedMessages });
        }
    };

    const handleDeleteMessages = () => {
        if (checkedMessagesId.length > 0) {
            deleteMessages({ messagesId: checkedMessagesId });
        }
    };

    const handleMarkReadMessage = () => {
        if (checkedMessagesId.length > 0) {
            markMessages({ messagesId: checkedMessagesId });
        }
    };

    useEffect(() => {
        if (error) {
            if ('data' in error) {
                const errorData = error.data as { message: string };
                dispatch(setAppErrorAC(errorData.message));
            }
        }
    }, [error]);

    return {
        handleDeleteMessages,
        handleMoveToFolder,
        handleMarkReadMessage,
        folders,
        checkedMessagesId,
        isOutgoing,
    };
};

export default useActionsButtonLogic;
