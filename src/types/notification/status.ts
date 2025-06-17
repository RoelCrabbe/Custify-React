import { faClock, faEnvelopeOpenText, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export const NotificationStatus = {
    Pending: 'Pending',
    Sent: 'Sent',
    Read: 'Read',
} as const;

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus];

export const isValidNotificationStatus = (
    notificationStatus: unknown,
): notificationStatus is NotificationStatus => {
    return (
        typeof notificationStatus === 'string' &&
        Object.values(NotificationStatus).includes(notificationStatus as NotificationStatus)
    );
};

export const getNotificationStatusColor = (status: NotificationStatus): string => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-200 text-yellow-900 border-yellow-300';
        case 'Sent':
            return 'bg-blue-200 text-blue-900 border-blue-300';
        case 'Read':
            return 'bg-green-200 text-green-900 border-green-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getNotificationStatusIcon = (status: NotificationStatus) => {
    switch (status) {
        case 'Pending':
            return faClock;
        case 'Sent':
            return faPaperPlane;
        case 'Read':
            return faEnvelopeOpenText;
        default:
            return faClock;
    }
};
