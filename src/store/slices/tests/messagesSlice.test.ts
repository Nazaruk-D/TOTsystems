import messagesReducer, {
    changeMessageStatus,
    changeAllMessagesStatus,
    setUsers,
    setMessages,
    clearAllMessagesStatus,
    InitialStateType,
} from '../messagesSlice';
import { MessageType } from '../../../types/MessageType';

describe('messages reducer', () => {
    const initialState: InitialStateType = {
        incomingMessages: [],
        outgoingMessages: [],
        users: [],
    };

    const createTestMessage = (id: number, is_selected = false): MessageType => ({
        id,
        message: 'Test message',
        subject: 'Test subject',
        sender: { id: 1, name: 'Sender', email: 'sender@example.com' },
        recipient: { id: 2, name: 'Recipient', email: 'recipient@example.com' },
        folder: 'inbox',
        is_read: false,
        is_selected,
        created_at: '2023-06-20T12:00:00Z',
    });

    it('should handle changeMessageStatus', () => {
        const id = 1;
        const status = true;
        const incomingMessage = createTestMessage(id);
        const outgoingMessage = createTestMessage(id);
        const state: InitialStateType = {
            incomingMessages: [incomingMessage],
            outgoingMessages: [outgoingMessage],
            users: [],
        };
        const nextState = messagesReducer(state, changeMessageStatus({ id, status }));

        expect(nextState.incomingMessages[0].is_selected).toBe(status);
        expect(nextState.outgoingMessages[0].is_selected).toBe(status);
    });

    it('should handle changeAllMessagesStatus', () => {
        const ids = [1, 2, 3];
        const status = true;
        const incomingMessages = ids.map((id) => createTestMessage(id));
        const outgoingMessages = ids.map((id) => createTestMessage(id));
        const state: InitialStateType = {
            incomingMessages,
            outgoingMessages,
            users: [],
        };
        const nextState = messagesReducer(state, changeAllMessagesStatus({ ids, status }));

        expect(nextState.incomingMessages.every((message) => message.is_selected === status)).toBe(true);
        expect(nextState.outgoingMessages.every((message) => message.is_selected === status)).toBe(true);
    });

    it('should handle clearAllMessagesStatus', () => {
        const selectedIncomingMessages = [createTestMessage(1, true), createTestMessage(2, true)];
        const selectedOutgoingMessages = [createTestMessage(3, true), createTestMessage(4, true)];
        const state: InitialStateType = {
            incomingMessages: selectedIncomingMessages,
            outgoingMessages: selectedOutgoingMessages,
            users: [],
        };
        const nextState = messagesReducer(state, clearAllMessagesStatus());

        expect(nextState.incomingMessages.every((message) => message.is_selected === false)).toBe(true);
        expect(nextState.outgoingMessages.every((message) => message.is_selected === false)).toBe(true);
    });

    it('should handle setUsers', () => {
        const users = [
            { id: 1, name: 'User 1', email: 'user1@example.com', avatar: '', folders: [] },
            { id: 2, name: 'User 2', email: 'user2@example.com', avatar: '', folders: [] },
            { id: 3, name: 'User 3', email: 'user3@example.com', avatar: '', folders: [] },
        ];
        const nextState = messagesReducer(initialState, setUsers(users));

        expect(nextState.users).toEqual(users);
    });

    it('should handle setMessages', () => {
        const incomingMessages = [createTestMessage(1), createTestMessage(2), createTestMessage(3)];
        const outgoingMessages = [createTestMessage(4), createTestMessage(5), createTestMessage(6)];
        const state: InitialStateType = {
            incomingMessages: [],
            outgoingMessages: [],
            users: [],
        };
        const nextState = messagesReducer(state, setMessages({ incomingMessages, outgoingMessages }));

        expect(nextState.incomingMessages).toEqual(incomingMessages);
        expect(nextState.outgoingMessages).toEqual(outgoingMessages);
    });

    it('should return the initial state if no action is provided', () => {
        const nextState = messagesReducer(undefined, {} as any);
        expect(nextState).toEqual(initialState);
    });
});
