import { isAuthPage, ROUTES } from '@config/routes';
import { getToken, removeAuthToken } from '@lib';
import { userService } from '@services/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@types';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    getValue: () => User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => void;
    refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const {
        data: user,
        refetch,
        error,
        failureCount,
        isLoading,
    } = useQuery<User | null>({
        queryKey: ['current-user'],
        staleTime: 10 * 60 * 1000,
        enabled: isHydrated && getToken() !== null,
        retry: 2,
        retryDelay: (5 / 3) * 1000,
        queryFn: async () => {
            const response = await userService.getCurrentUser();
            if (!response.ok)
                throw new Error(`CurrentUser Error ${response.status}: ${response.statusText}`);
            return (await response.json()) as User;
        },
    });

    useEffect(() => {
        if (error && failureCount >= 2) {
            removeAuthToken();

            if (!isAuthPage(router.asPath)) {
                router.push(ROUTES.AUTH.LOGIN);
            }
        }
    }, [error, failureCount]);

    const getValue = () => user ?? null;
    const isAuthenticated = Boolean(user);

    const logout = () => {
        removeAuthToken();
        queryClient.removeQueries({ queryKey: ['current-user'] });
    };

    return (
        <AuthContext.Provider
            value={{
                getValue,
                isAuthenticated,
                isLoading: !isHydrated || isLoading,
                logout,
                refetch,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
