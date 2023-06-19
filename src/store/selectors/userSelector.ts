import { AppRootStateType } from '../store';
import { UserType } from '../../types/UserType';

export const isLoggedInSelector = (state: AppRootStateType): boolean => state.user.isLoggedIn;
export const userDataSelector = (state: AppRootStateType): UserType => state.user.userData;
export const userEmailSelector = (state: AppRootStateType): string => state.user.userData.email;
export const userIdSelector = (state: AppRootStateType): number | null => state.user.userData.id;
export const userFoldersSelector = (state: AppRootStateType): string[] | null => state.user.userData.folders;
export const selectorIsActiveFolder = (state: AppRootStateType): string => state.user.isActiveFolder;
