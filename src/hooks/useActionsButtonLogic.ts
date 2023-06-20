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
    const [changeMessagesFolder] = useChangeMessagesFolderMutation();
    const [deleteMessages] = useDeleteMessageMutation();
    const [markMessages] = useMarkReadMessagesMutation();
    const isOutgoing = isActiveFolder === FoldersEnum.Outgoing;
    const messagesId = [...incomingIdCheckedMessages, ...outgoingIdCheckedMessages];

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
        if (messagesId.length > 0) {
            deleteMessages({ messagesId });
        }
    };

    const handleMarkReadMessage = () => {
        if (isOutgoing) {
            return;
        }
        if (messagesId.length > 0) {
            markMessages({ messagesId });
        }
    };

    return {
        handleDeleteMessages,
        handleMoveToFolder,
        handleMarkReadMessage,
        folders,
    };
};

export default useActionsButtonLogic;