import { AppRootStateType } from '../store';

export const selectorError = (state: AppRootStateType) => state.app.error;
export const selectorInformMessage = (state: AppRootStateType) => state.app.informMessage;
