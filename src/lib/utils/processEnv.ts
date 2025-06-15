/* eslint-disable no-undef */
export const getApiUrl = (): string => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    return url?.trim() || 'http://localhost:3000';
};

export const getWebSocketUrl = (): string => {
    const url = process.env.NEXT_WEBSOCKET_API_URL;
    return url?.trim() || 'ws://localhost:8765';
};

export const getBaseUrl = (): string => {
    const url = process.env.NEXT_BASE_API_URL;
    return url?.trim() || 'http://localhost:8080';
};
