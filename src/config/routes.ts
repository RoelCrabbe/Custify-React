export const ROUTES = {
    HOME: '/',

    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register',
        CHANGE_PASSWORD: '/auth/change-password',
    },

    ADMIN: {
        DASHBOARD: '/admin',
        USER_MANAGEMENT: '/admin/user-management',
    },

    ERRORS: {
        UNAUTHORIZED: '/401',
        FORBIDDEN: '/403',
        NOT_FOUND: '/404',
    },
} as const;

export const AUTH_PAGES = [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.LOGOUT,
    ROUTES.AUTH.REGISTER,
    ROUTES.AUTH.CHANGE_PASSWORD,
] as const;

export const isAuthPage = (pathname: string): boolean => {
    return AUTH_PAGES.includes(pathname as (typeof AUTH_PAGES)[number]);
};
