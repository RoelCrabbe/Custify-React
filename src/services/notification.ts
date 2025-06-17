import { getToken, processEnv } from '@lib';

export const getCurrentUserNotifications = () => {
    return fetch(processEnv.getApiUrl() + `/notifications`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};
