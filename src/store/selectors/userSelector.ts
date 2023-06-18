import { AppRootStateType } from '../store';
import { UserType } from '../../types/UserType';

export const isLoggedInSelector = (state: AppRootStateType): boolean => state.user.isLoggedIn;
export const userDataSelector = (state: AppRootStateType): UserType => state.user.userData;
export const userEmailSelector = (state: AppRootStateType): string => state.user.userData.email;
export const selectorIsActiveFolder = (state: AppRootStateType): string => state.user.isActiveFolder;
