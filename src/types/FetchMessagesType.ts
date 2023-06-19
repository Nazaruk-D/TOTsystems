import { MessageType } from './MessageType';

export type FetchMessagesType = {
    messages: {
        incoming: MessageType[];
        outgoing: MessageType[];
    };
};
