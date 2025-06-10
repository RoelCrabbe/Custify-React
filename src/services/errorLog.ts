import { getToken, processEnv } from '@lib';
import { ErrorLog } from '@types';

export const getAllErrorLogs = () => {
    return fetch(processEnv.getApiUrl() + `/error-logs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const updateErrorLog = (errorLog: ErrorLog) => {
    return fetch(processEnv.getApiUrl() + `/error-logs`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(errorLog),
    });
};
