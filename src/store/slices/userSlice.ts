import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoldersEnum } from '../../enums/foldersEnum';
import { UserType } from '../../types/UserType';

export type InitialStateType = {
    userData: UserType;
    isActiveFolder: string;
    isLoggedIn: boolean;
};

const initialState: InitialStateType = {
    userData: {
        id: '',
        name: '',
        email: '',
        avatar: '',
    },
    isActiveFolder: FoldersEnum.Incoming,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFolderName(state, action: PayloadAction<string>) {
            state.isActiveFolder = action.payload;
        },
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setUserData(state, action: PayloadAction<UserType>) {
            state.userData = action.payload;
        },
        clearUserData(state) {
            state.userData = {
                id: '',
                name: '',
                email: '',
                avatar: '',
            };
        },
    },
});

export const { setFolderName, setIsLoggedIn, setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
