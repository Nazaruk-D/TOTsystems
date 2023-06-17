import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../types/MessageType';

export type InitialStateType = {
    messages: MessageType[];
};

const initialState: InitialStateType = {
    messages: [
        {
            id: '1',
            message: 'test',
            subject: 'test subject',
            created_at: '22.05.2023',
            user: {
                id: '123',
                name: 'Имя пользователя',
            },
            folder: 'Входящие',
            isRead: false,
            isSelected: false,
        },
        {
            id: '2',
            message: 'test2',
            subject: 'test2 subject',
            created_at: '23.05.2023',
            user: {
                id: '123',
                name: 'Имя пользователя',
            },
            folder: 'Отправленные',
            isRead: false,
            isSelected: false,
        },
        {
            id: '3',
            message: 'test3',
            subject: 'test2 subject',
            created_at: '23.05.2023',
            user: {
                id: '123',
                name: 'Имя пользователя',
            },
            folder: 'Черновики',
            isRead: false,
            isSelected: false,
        },
        {
            id: '4',
            message: 'test4',
            subject: 'test2 subject',
            created_at: '23.05.2023',
            user: {
                id: '123',
                name: 'Имя пользователя',
            },
            folder: 'Удаленные',
            isRead: false,
            isSelected: false,
        },
    ],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        changeMessageStatusAC(state, action: PayloadAction<{ id: string; status: boolean }>) {
            const { id, status } = action.payload;
            state.messages = state.messages.map((message) => (message.id === id ? { ...message, isSelected: status } : message));
        },
        changeAllMessagesStatusAC(state, action: PayloadAction<{ ids: string[]; status: boolean }>) {
            const { ids, status } = action.payload;
            state.messages = state.messages.map((message) =>
                ids.includes(message.id) ? { ...message, isSelected: status } : message,
            );
        },
    },
});

export const { changeMessageStatusAC, changeAllMessagesStatusAC } = messagesSlice.actions;

export default messagesSlice.reducer;
