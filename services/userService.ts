import { User } from '@types';
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

export const userService = {
    loginUser,
    registerUser,
};
