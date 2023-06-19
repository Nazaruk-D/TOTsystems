import { AppRootStateType } from '../store';
import { UserType } from '../../types/UserType';
import { FoldersEnum } from '../../enums/foldersEnum';

export const usersSelector = (state: AppRootStateType): UserType[] => state.messages.users;

export const incomingCheckedIdMessagesSelector = (state: AppRootStateType): number[] => {
    return state.messages.incomingMessages
        .filter((incomingMessage) => incomingMessage.is_selected)
        .map((incomingMessage) => incomingMessage.id);
};

export const outgoingCheckedIdMessagesSelector = (state: AppRootStateType): number[] => {
    return state.messages.outgoingMessages
        .filter((outgoingMessage) => outgoingMessage.is_selected)
        .map((outgoingMessage) => outgoingMessage.id);
};

export const filteredIncomingMessagesSelector = (state: AppRootStateType, selectorIsActiveFolder: string) => {
    if (selectorIsActiveFolder === FoldersEnum.Outgoing) {
        return state.messages.outgoingMessages;
    }
    return state.messages.incomingMessages.filter((message) => message.folder === selectorIsActiveFolder);
};
