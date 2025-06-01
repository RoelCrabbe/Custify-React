import { getToken, processEnv } from '@lib';

export const getCurrentUser = () => {
    return fetch(processEnv.getApiUrl() + `/users/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const getAllUsers = () => {
    return fetch(processEnv.getApiUrl() + `/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};
