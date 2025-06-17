import { getToken, processEnv } from '@lib';
import { UpdatePassWord, User } from '@types';

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

export const getUserById = async (userId: number) => {
    return fetch(processEnv.getApiUrl() + `/users/${userId.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const updatePassWord = async (updatePassWord: UpdatePassWord) => {
    return fetch(processEnv.getApiUrl() + `/users/change-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(updatePassWord),
    });
};
