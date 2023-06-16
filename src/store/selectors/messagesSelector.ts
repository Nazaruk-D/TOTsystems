import { AppRootStateType } from '../store';

export const messagesInsideSelector = (state: AppRootStateType) => state.messages.messages;
