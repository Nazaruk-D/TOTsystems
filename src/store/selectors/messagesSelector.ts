import { AppRootStateType } from '../store';
import { UserType } from '../../types/UserType';
import { FoldersEnum } from '../../enums/foldersEnum';

export const incomingMessagesSelector = (state: AppRootStateType) => state.messages.incomingMessages;
export const outgoingMessagesInsideSelector = (state: AppRootStateType) => state.messages.outgoingMessages;
export const usersSelector = (state: AppRootStateType): UserType[] => state.messages.users;

export const filteredIncomingMessagesSelector = (state: AppRootStateType, selectorIsActiveFolder: string) => {
    if (selectorIsActiveFolder === FoldersEnum.Outgoing) {
        return state.messages.outgoingMessages;
    }
    return state.messages.incomingMessages.filter((message) => message.folder === selectorIsActiveFolder);
};
