import { getToken, handleExpiredToken } from '@lib';
import { userService } from '@services/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@types';
import { createContext, ReactNode, useContext, useEffect } from 'react';

type UserContextType = {
    getValue: () => User | null;
    isLoggedIn: boolean;
    logout: () => void;
    refetch: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();

    const { data, refetch, error, failureCount } = useQuery<User | null>({
        queryKey: ['current-user'],
        staleTime: 10 * 60 * 1000,
        enabled: getToken() !== null,
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
            handleExpiredToken();
        }
    }, [error, failureCount]);

    const getValue = () => data ?? null;
    const isLoggedIn = Boolean(data);

    const logout = () => {
        localStorage.removeItem('authToken');
        queryClient.removeQueries({ queryKey: ['current-user'] });
    };

    return (
        <>
            <UserContext.Provider value={{ getValue, isLoggedIn, logout, refetch }}>
                {children}
            </UserContext.Provider>
        </>
    );
};

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useCurrentUser must be used within a UserProvider');
    return context;
};
