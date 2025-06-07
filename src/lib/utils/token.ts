import { isAuthPage, ROUTES } from '@config/routes';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

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
    const router = useRouter();
    localStorage.removeItem('authToken');

    if (!isAuthPage(router.asPath)) {
        router.push(ROUTES.AUTH.LOGIN);
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
