import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoldersEnum } from '../../enums/foldersEnum';

export type InitialStateType = {
    error: null | string;
    informMessage: null | string;
    isActiveFolder: string;
    initialized: boolean;
};

const initialState: InitialStateType = {
    error: null,
    informMessage: null,
    isActiveFolder: FoldersEnum.Incoming,
    initialized: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<null | string>) {
            state.error = action.payload;
        },
        setAppInformMessage(state, action: PayloadAction<null | string>) {
            state.informMessage = action.payload;
        },
        setFolderName(state, action: PayloadAction<string>) {
            state.isActiveFolder = action.payload;
        },
        setInitializedStatus(state, action: PayloadAction<boolean>) {
            state.initialized = action.payload;
        },
    },
});

export const { setAppErrorAC, setAppInformMessage, setInitializedStatus, setFolderName } = appSlice.actions;

export default appSlice.reducer;
