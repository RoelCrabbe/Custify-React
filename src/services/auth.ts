import { processEnv } from '@lib';
import { User } from '@types';

export const loginUser = (user: User) => {
    return fetch(processEnv.getApiUrl() + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

export const registerUser = (user: User) => {
    return fetch(processEnv.getApiUrl() + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};
