import { NotificationCategory, NotificationPriority, NotificationStatus, User } from '@types';

export type Notification = {
    id?: number;
    title: string;
    body: string;
    status: NotificationStatus;
    category: NotificationCategory;
    priority: NotificationPriority;
    sentDate?: Date;
    readDate?: Date;
    senderById?: number;
    sender?: User;
    recipientById?: number;
    recipient: User;
};
