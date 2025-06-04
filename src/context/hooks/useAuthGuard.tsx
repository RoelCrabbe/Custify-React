import { useCurrentUser } from '@provider/UserProvider';
import { Role } from '@types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthGuardConfig {
    redirectTo?: string;
    requireAuth?: boolean;
    allowedRoles?: string[];
    blockIfAuthenticated?: boolean;
}

export const useAuthGuard = (config: AuthGuardConfig = {}) => {
    const {
        redirectTo = '/',
        requireAuth = false,
        allowedRoles,
        blockIfAuthenticated = false,
    } = config;

    const currentUser = useCurrentUser();
    const router = useRouter();
    const user = currentUser.getValue();

    useEffect(() => {
        if (blockIfAuthenticated && user) {
            router.push(redirectTo);
            return;
        }

        if (requireAuth && !user) {
            router.push('/login');
            return;
        }

        if (user && allowedRoles && allowedRoles.length > 0) {
            const hasRequiredRole = allowedRoles.includes(user.role);

            if (!hasRequiredRole) {
                router.push('/401');
                return;
            }
        }
    }, [user, requireAuth, allowedRoles, blockIfAuthenticated, redirectTo, router]);

    return {
        currentUser,
        isAuthenticated: !!user,
        isAuthorized: !allowedRoles || (user && allowedRoles.includes(user.role)),
        shouldRender: (() => {
            if (blockIfAuthenticated) return !user;
            if (requireAuth) return !!user;
            return true;
        })(),
        loading: false,
    };
};

export const useRequireAuth = (redirectTo: string = '/users/login') => {
    return useAuthGuard({
        requireAuth: true,
        redirectTo,
    });
};

export const useRequireRole = (roles: string[], redirectTo: string = '/401') => {
    return useAuthGuard({
        requireAuth: true,
        allowedRoles: roles,
        redirectTo,
    });
};

export const useBlockAuthenticated = (redirectTo: string = '/403') => {
    return useAuthGuard({
        blockIfAuthenticated: true,
        redirectTo,
    });
};

export const useRequireAdmin = (redirectTo: string = '/403') => {
    return useAuthGuard({
        requireAuth: true,
        allowedRoles: [Role.ADMIN],
        redirectTo,
    });
};
