import UserManagementTable from '@components/admin/UserManagementTable';
import PageLayout from '@components/layout/PageLayout';
import { userService } from '@services/index';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useRequireAdmin } from 'context/hooks/useAuthGuard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Admin: React.FC = () => {
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

    const pageLoading = !shouldRender || usersIsLoading;

    return (
        <>
            <PageLayout pageName={'Admin Panel'} isSideBarContent={true} isLoading={pageLoading}>
                <UserManagementTable
                    data={users}
                    isError={usersIsError}
                    isLoading={usersIsLoading}
                    error={usersError}
                    onRetry={() => queryClient.invalidateQueries({ queryKey: ['all-users'] })}
                />
            </PageLayout>
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

export default Admin;
