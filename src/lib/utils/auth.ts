export const AUTH_PAGES = ['/login', '/register'] as const;

export const isAuthPage = (pathname: string): boolean => {
    return AUTH_PAGES.includes(pathname as (typeof AUTH_PAGES)[number]);
};
