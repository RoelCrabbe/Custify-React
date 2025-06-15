import { jwtDecode } from 'jwt-decode';
import { GetServerSidePropsContext } from 'next';

// ========================================
// TYPES & CONFIGURATION
// ========================================

export type DecodedToken = {
    exp: number;
    [key: string]: any;
};

const TOKEN_COOKIE_NAME = 'authToken';
const COOKIE_OPTIONS = {
    maxAge: 8 * 60 * 60, // 8 hours in seconds
    httpOnly: false,
    secure: false,
    sameSite: 'lax' as const,
    path: '/',
};

// ========================================
// CORE COOKIE OPERATIONS
// ========================================

/**
 * Set a cookie with the given name and value
 */
export const setCookie = (name: string, value: string, options: any = {}) => {
    if (typeof window === 'undefined') return;

    const opts = { ...COOKIE_OPTIONS, ...options };
    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (opts.maxAge) cookieString += `; max-age=${opts.maxAge}`;
    if (opts.path) cookieString += `; path=${opts.path}`;
    if (opts.secure) cookieString += `; secure`;
    if (opts.sameSite) cookieString += `; samesite=${opts.sameSite}`;
    if (opts.httpOnly) cookieString += `; httponly`;

    document.cookie = cookieString;
};

/**
 * Get a cookie value by name (client-side)
 */
export const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
};

/**
 * Delete a cookie by name
 */
export const deleteCookie = (name: string) => {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=; max-age=0; path=/`;
};

/**
 * Get a cookie value by name (server-side)
 */
export const getServerSideCookie = (
    context: GetServerSidePropsContext,
    name: string,
): string | null => {
    const cookies = context.req.headers.cookie;
    if (!cookies) return null;

    const cookie = cookies.split(';').find((c) => c.trim().startsWith(`${name}=`));
    if (!cookie) return null;

    return decodeURIComponent(cookie.split('=')[1]);
};

// ========================================
// JWT TOKEN VALIDATION
// ========================================

/**
 * Check if a JWT token is expired (with 30 second buffer)
 */
export const isTokenExpired = (token: string) => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime + 30;
    } catch (error) {
        console.error('Error decoding token:', error);
    }
};

// ========================================
// AUTH TOKEN MANAGEMENT
// ========================================

/**
 * Get the auth token from cookie (works on both client and server)
 * Returns null if token doesn't exist or is expired
 */
export const getToken = (context?: GetServerSidePropsContext): string | null => {
    let token: string | null;

    if (context) {
        token = getServerSideCookie(context, TOKEN_COOKIE_NAME);
    } else {
        token = getCookie(TOKEN_COOKIE_NAME);
    }

    if (!token) return null;

    if (isTokenExpired(token)) {
        if (!context) {
            deleteCookie(TOKEN_COOKIE_NAME);
        }
        return null;
    }

    return token;
};

/**
 * Set the authentication token in cookie
 */
export const setAuthToken = (token: string) => {
    setCookie(TOKEN_COOKIE_NAME, token);
};

/**
 * Remove the authentication token from cookie
 */
export const removeAuthToken = () => {
    deleteCookie(TOKEN_COOKIE_NAME);
};

/**
 * Get valid token (alias for getToken for backward compatibility)
 */
export const getValidToken = (context?: GetServerSidePropsContext): string | null => {
    return getToken(context);
};
