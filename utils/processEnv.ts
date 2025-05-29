const getApiUrl = (): string => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    return url?.trim() || 'http://localhost:3000';
};

const getWebSocketUrl = (): string => {
    const url = process.env.NEXT_WEBSOCKET_API_URL;
    return url?.trim() || 'ws://localhost:8765';
};

const getBaseUrl = (): string => {
    const url = process.env.NEXT_BASE_API_URL;
    return url?.trim() || 'http://localhost:8080';
};

export const processEnv = {
    getApiUrl,
    getWebSocketUrl,
    getBaseUrl,
};
