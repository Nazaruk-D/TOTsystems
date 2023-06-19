import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../types/MessageType';

export type InitialStateType = {
    searchValue: string;
};

const initialState: InitialStateType = {
    searchValue: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
