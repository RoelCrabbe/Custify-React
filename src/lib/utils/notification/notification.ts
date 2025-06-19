import { Notification, NotificationStatus } from '@types';

export const updateNotifications = (
    prevNotifications: Notification[],
    updatedNotification: Notification,
) => {
    if (updatedNotification.readDate && updatedNotification.status === NotificationStatus.Read) {
        return prevNotifications.filter(
            (notification) => notification.id !== updatedNotification.id,
        );
    }

    return prevNotifications.map((notification) =>
        notification.id === updatedNotification.id ? updatedNotification : notification,
    );
};
