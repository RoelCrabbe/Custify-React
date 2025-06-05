import UserManagement from '@components/admin/UserManagement';
import AdminPageLayout from '@components/layout/AdminPageLayout';
import { useRequireAdmin } from '@hooks/useAuthGuard';
import { userService } from '@services/index';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const UserManagementPage: React.FC = () => {
    const { shouldRender, currentUser } = useRequireAdmin();
    const queryClient = new QueryClient();

    const {
        data: users,
        isError: usersIsError,
        isLoading: usersIsLoading,
        error: usersError,
    } = useQuery({
        queryKey: ['all-users'],
        staleTime: 600000,
        queryFn: async () => {
            const response = await userService.getAllUsers();
            return response.ok ? await response.json() : [];
        },
    });

    const pageLoading = usersIsLoading || !shouldRender;

    return (
        <>
            <AdminPageLayout
                pageName={'User Management'}
                description={'Manage and monitor user accounts'}
                isLoading={pageLoading}>
                <UserManagement
                    data={users}
                    isError={usersIsError}
                    isLoading={usersIsLoading}
                    error={usersError}
                    onRetry={() => queryClient.invalidateQueries({ queryKey: ['all-users'] })}
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
