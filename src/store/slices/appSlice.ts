import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoldersEnum } from '../../enums/foldersEnum';

export type InitialStateType = {
    error: null | string;
    informMessage: null | string;
    isActiveFolder: string;
};

const initialState: InitialStateType = {
    error: null,
    informMessage: null,
    isActiveFolder: FoldersEnum.Incoming,
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
    },
});

export const { setAppErrorAC, setAppInformMessage } = appSlice.actions;

export default appSlice.reducer;
