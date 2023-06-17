import { AppRootStateType } from '../store';

export const selectorError = (state: AppRootStateType) => state.app.error;
export const selectorInformMessage = (state: AppRootStateType) => state.app.informMessage;
export const selectorIsActiveFolder = (state: AppRootStateType): string => state.app.isActiveFolder;
