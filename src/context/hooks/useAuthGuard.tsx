import { ROUTES } from '@config/routes';
import { useAuth } from '@provider/AuthProvider';
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
        redirectTo = ROUTES.HOME,
        requireAuth = false,
        allowedRoles,
        blockIfAuthenticated = false,
    } = config;

    const router = useRouter();
    const currentUser = useAuth();
    const user = currentUser.getValue();

    useEffect(() => {
        if (currentUser.isLoading) return;

        if (blockIfAuthenticated && user) {
            router.push(redirectTo);
            return;
        }

        if (requireAuth && !user) {
            router.push(ROUTES.AUTH.LOGIN);
            return;
        }

        if (user && allowedRoles && allowedRoles.length > 0) {
            const hasRequiredRole = allowedRoles.includes(user.role);

            if (!hasRequiredRole) {
                router.push(ROUTES.ERRORS.UNAUTHORIZED);
                return;
            }
        }
    }, [
        user,
        requireAuth,
        allowedRoles,
        blockIfAuthenticated,
        redirectTo,
        router,
        currentUser.isLoading,
    ]);

    return {
        currentUser,
        isAuthenticated: !!user,
        isAuthorized: !allowedRoles || (user && allowedRoles.includes(user.role)),
        shouldRender: (() => {
            if (currentUser.isLoading) return false;
            if (blockIfAuthenticated) return !user;
            if (requireAuth) return !!user;
            return true;
        })(),
        loading: currentUser.isLoading,
    };
};

export const useOptionalAuth = () => {
    return useAuthGuard({
        requireAuth: false,
        blockIfAuthenticated: false,
    });
};

export const useRequireAuth = (redirectTo: string = ROUTES.AUTH.LOGIN) => {
    return useAuthGuard({
        requireAuth: true,
        redirectTo,
    });
};

export const useRequireRole = (
    roles: string[],
    redirectTo: string = ROUTES.ERRORS.UNAUTHORIZED,
) => {
    return useAuthGuard({
        requireAuth: true,
        allowedRoles: roles,
        redirectTo,
    });
};

export const useBlockAuthenticated = (redirectTo: string = ROUTES.ERRORS.FORBIDDEN) => {
    return useAuthGuard({
        blockIfAuthenticated: true,
        redirectTo,
    });
};

export const useRequireAdmin = (redirectTo: string = ROUTES.ERRORS.FORBIDDEN) => {
    return useAuthGuard({
        requireAuth: true,
        allowedRoles: [Role.Admin],
        redirectTo,
    });
};
