import { User } from '@types';
import { getToken } from 'utils/authUtils';
import { processEnv } from 'utils/processEnv';

const loginUser = (user: User) => {
    return fetch(processEnv.getApiUrl() + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: User) => {
    return fetch(processEnv.getApiUrl() + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const getCurrentUser = () => {
    return fetch(processEnv.getApiUrl() + `/users/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const userService = {
    loginUser,
    registerUser,
    getCurrentUser,
};
