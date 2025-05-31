import { User } from '@types';
import { handleExpiredToken, isTokenExpired } from 'utils/tokenUtils';

export const getToken = () => {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('authToken');
    if (!token) return null;

    if (isTokenExpired(token)) {
        handleExpiredToken();
        return null;
    }

    return token;
};

export const getUserRole = (user: User | null): string => {
    return user ? user.role : '';
};
