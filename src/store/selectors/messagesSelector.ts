import { AppRootStateType } from '../store';

export const messagesInsideSelector = (state: AppRootStateType) => state.messages.messages;

export const filteredMessagesSelector = (state: AppRootStateType, selectorIsActiveFolder: string) => {
    return state.messages.messages.filter((message) => message.folder === selectorIsActiveFolder);
};
