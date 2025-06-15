import { ROUTES, isAuthPage } from '@config/routes';
import { useAuth } from '@provider/AuthProvider';
import { isAdmin } from '@types';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export const useNavigationState = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading, getValue: getUser, logout } = useAuth();

    const getLinkClassName = useCallback(
        (href: string) => {
            return `nav-link${router.pathname === href ? ' nav-link-active' : ''}`;
        },
        [router.pathname],
    );

    const handleLogout = () => {
        logout();
        router.push(ROUTES.HOME);
    };

    return useMemo(() => {
        const currentPath = router.pathname;
        const user = isLoading ? null : getUser();

        if (isLoading) {
            return {
                isLoading: true,
                isAuthenticated: false,
                user: null,
                currentPath,
                isOnAuthPage: false,
                isOnLoginPage: false,
                userIsAdmin: false,
                getLinkClassName,
                handleLogout,
            };
        }

        const isOnAuthPage = isAuthPage(currentPath);
        const isOnLoginPage = currentPath === ROUTES.AUTH.LOGIN;
        const userIsAdmin = user ? isAdmin(user) : false;

        return {
            isLoading: false,
            isAuthenticated,
            user,
            currentPath,
            isOnAuthPage,
            isOnLoginPage,
            userIsAdmin,
            getLinkClassName,
            handleLogout,
        };
    }, [isAuthenticated, isLoading, getUser, router.pathname, getLinkClassName, handleLogout]);
};
