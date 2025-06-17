import { faBell, faExclamationCircle, faServer } from '@fortawesome/free-solid-svg-icons';

export const NotificationCategory = {
    General: 'General',
    System: 'System',
    Alert: 'Alert',
} as const;

export type NotificationCategory = (typeof NotificationCategory)[keyof typeof NotificationCategory];

export const isValidNotificationCategory = (
    notificationCategory: unknown,
): notificationCategory is NotificationCategory => {
    return (
        typeof notificationCategory === 'string' &&
        Object.values(NotificationCategory).includes(notificationCategory as NotificationCategory)
    );
};

export const getNotificationCategoryColor = (category: NotificationCategory): string => {
    switch (category) {
        case 'General':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'System':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Alert':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getNotificationCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
        case 'General':
            return faBell;
        case 'System':
            return faServer;
        case 'Alert':
            return faExclamationCircle;
        default:
            return faBell;
    }
};
