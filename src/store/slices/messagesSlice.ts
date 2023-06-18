import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../types/MessageType';
import { UserType } from '../../types/UserType';

export type InitialStateType = {
    messages: MessageType[];
    users: UserType[];
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
    users: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        changeMessageStatus(state, action: PayloadAction<{ id: string; status: boolean }>) {
            const { id, status } = action.payload;
            state.messages = state.messages.map((message) => (message.id === id ? { ...message, isSelected: status } : message));
        },
        changeAllMessagesStatus(state, action: PayloadAction<{ ids: string[]; status: boolean }>) {
            const { ids, status } = action.payload;
            state.messages = state.messages.map((message) =>
                ids.includes(message.id) ? { ...message, isSelected: status } : message,
            );
        },
        setUsers(state, action: PayloadAction<UserType[]>) {
            state.users = action.payload;
        },
        setMessages(state, action: PayloadAction<MessageType[]>) {
            state.messages = action.payload;
        },
    },
});

export const { changeMessageStatus, changeAllMessagesStatus, setUsers, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
