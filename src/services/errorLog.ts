import { getToken, processEnv } from '@lib';

export const getAllErrorLogs = () => {
    return fetch(processEnv.getApiUrl() + `/error-logs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};
