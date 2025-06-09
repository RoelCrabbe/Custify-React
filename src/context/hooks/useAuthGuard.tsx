import { ROUTES } from '@config/routes';
import { useAuth } from '@provider/AuthProvider';
import { UserRole } from '@types';
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
    const isLoading = currentUser.isLoading;

    const hasRequiredRole = (): boolean => {
        if (!allowedRoles?.length) return true;
        return user ? allowedRoles.includes(user.role) : false;
    };

    const shouldRender = (): boolean => {
        if (isLoading) return false;
        if (blockIfAuthenticated) return !user;
        if (requireAuth && !user) return false;
        if (allowedRoles?.length) return hasRequiredRole();
        return requireAuth ? !!user : true;
    };

    useEffect(() => {
        if (isLoading) return;

        if (blockIfAuthenticated && user) {
            router.push(redirectTo);
            return;
        }

        if (requireAuth && !user) {
            router.push(ROUTES.AUTH.LOGIN);
            return;
        }

        if (user && allowedRoles?.length && !hasRequiredRole()) {
            router.push(ROUTES.ERRORS.UNAUTHORIZED);
            return;
        }
    }, [user, isLoading, requireAuth, allowedRoles, blockIfAuthenticated, redirectTo, router]);

    return {
        currentUser,
        loading: isLoading,
        isAuthenticated: !!user,
        isAuthorized: hasRequiredRole(),
        shouldRender: shouldRender(),
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
        allowedRoles: [UserRole.Admin],
        redirectTo,
    });
};
