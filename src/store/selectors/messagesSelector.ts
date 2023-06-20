import { createSelector } from '@reduxjs/toolkit';
import { AppRootStateType } from '../store';
import { UserType } from '../../types/UserType';
import { FoldersEnum } from '../../enums/foldersEnum';
import { MessageType } from '../../types/MessageType';

export const usersSelector = (state: AppRootStateType): UserType[] => state.messages.users;
const incomingMessagesSelector = (state: AppRootStateType) => state.messages.incomingMessages;
const outgoingMessagesSelector = (state: AppRootStateType) => state.messages.outgoingMessages;

export const incomingCheckedIdMessagesSelector = createSelector(incomingMessagesSelector, (incomingMessages) =>
    incomingMessages.filter((incomingMessage) => incomingMessage.is_selected).map((incomingMessage) => incomingMessage.id),
);

export const outgoingCheckedIdMessagesSelector = createSelector(outgoingMessagesSelector, (outgoingMessages) =>
    outgoingMessages.filter((outgoingMessage) => outgoingMessage.is_selected).map((outgoingMessage) => outgoingMessage.id),
);

export const messageSelector = (state: AppRootStateType, messageId: number): MessageType | null => {
    const message =
        state.messages.outgoingMessages.find((outgoingMessage) => outgoingMessage.id === messageId) ??
        state.messages.incomingMessages.find((incomingMessage) => incomingMessage.id === messageId);
    return message || null;
};

export const filteredIncomingMessagesSelector = createSelector(
    (state: AppRootStateType) => state.search.searchValue,
    (state: AppRootStateType) => state.messages.outgoingMessages,
    (state: AppRootStateType) => state.messages.incomingMessages,
    (state: AppRootStateType, selectorIsActiveFolder: string) => selectorIsActiveFolder,
    (searchValue, outgoingMessages, incomingMessages, selectorIsActiveFolder) => {
        if (searchValue) {
            if (selectorIsActiveFolder === FoldersEnum.Outgoing) {
                return outgoingMessages.filter(
                    (message) =>
                        message.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
                        message.message.toLowerCase().includes(searchValue.toLowerCase()) ||
                        message.recipient.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                        message.recipient.email.toLowerCase().includes(searchValue.toLowerCase()),
                );
            }
            return incomingMessages
                .filter((message) => message.folder === selectorIsActiveFolder)
                .filter(
                    (message) =>
                        message.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
                        message.message.toLowerCase().includes(searchValue.toLowerCase()) ||
                        message.sender.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                        message.sender.email.toLowerCase().includes(searchValue.toLowerCase()),
                );
        }
        if (selectorIsActiveFolder === FoldersEnum.Outgoing) {
            return outgoingMessages;
        }
        return incomingMessages.filter((message) => message.folder === selectorIsActiveFolder);
    },
);
