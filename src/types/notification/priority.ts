import { faArrowDown, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const NotificationPriority = {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
} as const;

export type NotificationPriority = (typeof NotificationPriority)[keyof typeof NotificationPriority];

export const isValidNotificationPriority = (
    notificationPriority: unknown,
): notificationPriority is NotificationPriority => {
    return (
        typeof notificationPriority === 'string' &&
        Object.values(NotificationPriority).includes(notificationPriority as NotificationPriority)
    );
};

export const getNotificationPriorityColor = (priority: NotificationPriority): string => {
    switch (priority) {
        case 'Low':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'High':
            return 'bg-red-200 text-red-900 border-red-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getNotificationPriorityIcon = (priority: NotificationPriority) => {
    switch (priority) {
        case 'Low':
            return faArrowDown;
        case 'Medium':
            return faArrowRight;
        case 'High':
            return faArrowUp;
        default:
            return faArrowRight;
    }
};
