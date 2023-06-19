import { AppRootStateType } from '../store';

export const searchSelector = (state: AppRootStateType): string => state.search.searchValue;
