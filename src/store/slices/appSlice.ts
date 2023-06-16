import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitialStateType = {
    error: null | string;
    informMessage: null | string;
    initialized: boolean;
};

const initialState: InitialStateType = {
    error: null,
    informMessage: null,
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
        setInitializedStatus(state, action: PayloadAction<boolean>) {
            state.initialized = action.payload;
        },
    },
});

export const { setAppErrorAC, setAppInformMessage, setInitializedStatus } = appSlice.actions;

export default appSlice.reducer;
