import UserManagement from '@components/admin/UserManagement';
import AdminPageLayout from '@components/layout/AdminPageLayout';
import { useRequireAdmin } from '@hooks/useAuthGuard';
import { userService } from '@services/index';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

const UserManagementPage: React.FC = () => {
    const { shouldRender, currentUser } = useRequireAdmin();
    const [users, setUsers] = useState<User[]>([]);

    const {
        data: usersData,
        error: usersError,
        isError: usersIsError,
        isLoading: usersIsLoading,
    } = useQuery({
        queryKey: ['user-management'],
        staleTime: 10 * 60 * 1000,
        enabled: shouldRender,
        queryFn: async () => {
            const response = await userService.getAllUsers();
            return response.ok ? await response.json() : [];
        },
    });

    const handleRetry = () => {
        queryClient.invalidateQueries({ queryKey: ['user-management'] });
    };

    const handleUserUpdate = (updatedUser: User) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
        );
    };

    useEffect(() => {
        if (usersData && Array.isArray(usersData)) {
            setUsers(usersData);
        }
    }, [usersData]);

    return (
        <>
            <AdminPageLayout
                pageName={'User Management'}
                description={'Manage and monitor user accounts'}
                isLoading={usersIsLoading || !shouldRender}>
                <UserManagement
                    users={users}
                    error={usersError}
                    isError={usersIsError}
                    isLoading={usersIsLoading}
                    onUpdate={handleUserUpdate}
                    onRetry={handleRetry}
                />
            </AdminPageLayout>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default UserManagementPage;
