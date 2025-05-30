import { User } from '@types';

export const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
};

export const getUserRole = (user: User | null): string => {
    return user ? user.role : '';
};
