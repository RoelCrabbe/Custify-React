import { jwtDecode } from 'jwt-decode';
import router from 'next/router';

export type DecodedToken = {
    exp: number;
    [key: string]: any;
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime + 30;
    } catch (error) {
        return true;
    }
};

export const handleExpiredToken = () => {
    localStorage.removeItem('authToken');

    const currentPath = router.asPath;
    const authPages = ['/login', '/register'];

    if (!authPages.includes(currentPath)) {
        router.push('/login');
    }
};

export const getValidToken = (): string | null => {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('authToken');
    if (!token) return null;

    if (isTokenExpired(token)) {
        handleExpiredToken();
        return null;
    }

    return token;
};

export const getToken = (): string | null => {
    return getValidToken();
};
