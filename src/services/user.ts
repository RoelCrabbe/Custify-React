import { getToken, processEnv } from '@lib';
import { User } from '@types';

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

export const updateUser = (user: User) => {
    return fetch(processEnv.getApiUrl() + `/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(user),
    });
};
