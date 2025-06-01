import { getToken } from 'utils/authUtils';
import { processEnv } from 'utils/processEnv';

const getCurrentUser = () => {
    return fetch(processEnv.getApiUrl() + `/users/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

const getAllUsers = () => {
    return fetch(processEnv.getApiUrl() + `/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const userService = {
    getCurrentUser,
    getAllUsers,
};
