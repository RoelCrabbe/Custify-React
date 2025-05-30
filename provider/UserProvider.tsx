import { userService } from '@services/userService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@types';
import { createContext, ReactNode, useContext } from 'react';
import { getToken } from 'utils/authUtils';

type UserContextType = {
    getValue: () => User | null;
    logout: () => void;
    refetch: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();

    const { data, refetch } = useQuery<User | null>({
        queryKey: ['current-user'],
        staleTime: 10 * 60 * 1000,
        enabled: getToken() !== null,
        queryFn: async () => {
            const response = await userService.getCurrentUser();
            return response.ok ? ((await response.json()) as User) : null;
        },
    });

    const getValue = () => data ?? null;

    const logout = () => {
        localStorage.removeItem('authToken');
        queryClient.removeQueries({ queryKey: ['current-user'] });
    };

    return (
        <>
            <UserContext.Provider value={{ getValue, logout, refetch }}>
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
