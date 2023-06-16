export type MessageType = {
    id: string;
    message: string;
    subject: string;
    from: string;
    folder: string;
    isRead: boolean;
    created_at: string;
    isSelected?: boolean;
};
