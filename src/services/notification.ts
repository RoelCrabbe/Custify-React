import { getToken, processEnv } from '@lib';
import { Notification } from '@types';

export const getCurrentUserNotifications = () => {
    return fetch(processEnv.getApiUrl() + `/notifications`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const createNotification = (notification: Notification) => {
    return fetch(processEnv.getApiUrl() + `/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(notification),
    });
};
