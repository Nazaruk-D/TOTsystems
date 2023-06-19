import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../types/MessageType';
import { UserType } from '../../types/UserType';

export type InitialStateType = {
    incomingMessages: MessageType[];
    outgoingMessages: MessageType[];
    users: UserType[];
};

const initialState: InitialStateType = {
    incomingMessages: [],
    outgoingMessages: [],
    users: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        changeMessageStatus(state, action: PayloadAction<{ id: number; status: boolean }>) {
            const { id, status } = action.payload;
            state.incomingMessages = state.incomingMessages.map((message: MessageType) =>
                message.id === id ? { ...message, is_selected: status } : message,
            );
            state.outgoingMessages = state.outgoingMessages.map((message: MessageType) =>
                message.id === id ? { ...message, is_selected: status } : message,
            );
        },
        changeAllMessagesStatus(state, action: PayloadAction<{ ids: number[]; status: boolean }>) {
            const { ids, status } = action.payload;
            state.incomingMessages = state.incomingMessages.map((message: MessageType) =>
                ids.includes(message.id) ? { ...message, is_selected: status } : message,
            );
            state.outgoingMessages = state.outgoingMessages.map((message: MessageType) =>
                ids.includes(message.id) ? { ...message, is_selected: status } : message,
            );
        },
        clearAllMessagesStatus(state) {
            state.incomingMessages = state.incomingMessages.map((message: MessageType) => ({ ...message, is_selected: false }));
            state.outgoingMessages = state.outgoingMessages.map((message: MessageType) => ({ ...message, is_selected: false }));
        },
        setUsers(state, action: PayloadAction<UserType[]>) {
            state.users = action.payload;
        },
        setMessages(state, action: PayloadAction<{ incomingMessages: MessageType[]; outgoingMessages: MessageType[] }>) {
            const { incomingMessages, outgoingMessages } = action.payload;
            state.incomingMessages = incomingMessages;
            state.outgoingMessages = outgoingMessages;
        },
    },
});

export const { changeMessageStatus, changeAllMessagesStatus, setUsers, setMessages, clearAllMessagesStatus } =
    messagesSlice.actions;

export default messagesSlice.reducer;
