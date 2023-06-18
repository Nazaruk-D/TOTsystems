import { MessageType } from './MessageType';
import { UserType } from './UserType';

export type ServerData = {
    userData: UserType;
    users: UserType[];
    messages: MessageType[];
};
