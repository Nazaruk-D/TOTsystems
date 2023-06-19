import { AppRootStateType } from '../store';
import { UserType } from '../../types/UserType';
import { FoldersEnum } from '../../enums/foldersEnum';
import { MessageType } from '../../types/MessageType';

export const usersSelector = (state: AppRootStateType): UserType[] => state.messages.users;

export const incomingCheckedIdMessagesSelector = (state: AppRootStateType): number[] => {
    return state.messages.incomingMessages
        .filter((incomingMessage) => incomingMessage.is_selected)
        .map((incomingMessage) => incomingMessage.id);
};

export const messageSelector = (state: AppRootStateType, messageId: number): MessageType | null => {
    const message =
        state.messages.outgoingMessages.find((outgoingMessage) => outgoingMessage.id === messageId) ??
        state.messages.incomingMessages.find((incomingMessage) => incomingMessage.id === messageId);
    return message || null;
};

export const outgoingCheckedIdMessagesSelector = (state: AppRootStateType): number[] => {
    return state.messages.outgoingMessages
        .filter((outgoingMessage) => outgoingMessage.is_selected)
        .map((outgoingMessage) => outgoingMessage.id);
};

export const filteredIncomingMessagesSelector = (state: AppRootStateType, selectorIsActiveFolder: string) => {
    const { searchValue } = state.search;
    if (searchValue) {
        if (selectorIsActiveFolder === FoldersEnum.Outgoing) {
            return state.messages.outgoingMessages.filter(
                (message) => message.subject.includes(searchValue) || message.message.includes(searchValue),
            );
        }
        return state.messages.incomingMessages
            .filter((message) => message.folder === selectorIsActiveFolder)
            .filter((message) => message.subject.includes(searchValue) || message.message.includes(searchValue));
    }
    if (selectorIsActiveFolder === FoldersEnum.Outgoing) {
        return state.messages.outgoingMessages;
    }
    return state.messages.incomingMessages.filter((message) => message.folder === selectorIsActiveFolder);
};
