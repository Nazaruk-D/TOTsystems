import { AppRootStateType } from '../store';
import { UserType } from '../../types/UserType';

export const messagesInsideSelector = (state: AppRootStateType) => state.messages.messages;
export const usersSelector = (state: AppRootStateType): UserType[] => state.messages.users;

export const filteredMessagesSelector = (state: AppRootStateType, selectorIsActiveFolder: string) => {
    return state.messages.messages.filter((message) => message.folder === selectorIsActiveFolder);
};
