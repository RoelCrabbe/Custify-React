import UserManagement from '@components/admin/userManagement/UserManagement';
import AdminPageLayout from '@components/layout/AdminPageLayout';
import { useRequireAdmin } from '@hooks/useAuthGuard';
import { useEntityList } from '@hooks/useEntity';
import { userService } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

const UserManagementPage: React.FC = () => {
    const { shouldRender } = useRequireAdmin();
    const { entities, handleUpdate, safeSetEntities } = useEntityList<User>([]);

    const {
        data: usersData,
        isError,
        isLoading,
        refetch: onRetry,
    } = useQuery({
        queryKey: ['user-management'],
        staleTime: 10 * 60 * 1000,
        enabled: shouldRender,
        queryFn: async () => {
            const response = await userService.getAllUsers();
            return response.ok ? await response.json() : [];
        },
    });

    useEffect(() => {
        safeSetEntities(usersData);
    }, [usersData]);

    return (
        <AdminPageLayout
            pageName={'User Management'}
            description={'Manage and monitor user accounts'}
            isLoading={isLoading || !shouldRender}>
            <UserManagement
                users={entities}
                isError={isError}
                isLoading={isLoading}
                onUpdate={handleUpdate}
                onRetry={onRetry}
            />
        </AdminPageLayout>
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
