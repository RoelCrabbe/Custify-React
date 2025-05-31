import UserManagementTable from '@components/admin/UserManagementTable';
import MainLayout from '@components/layout/MainLayout';
import { useCurrentUser } from '@provider/UserProvider';
import { userService } from '@services/userService';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Admin: React.FC = () => {
    const currentUser = useCurrentUser();

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

    return (
        <>
            <MainLayout pageName={'Admin Panel'} isSideBarContent isLoading={usersIsLoading}>
                <UserManagementTable
                    data={users}
                    isError={usersIsError}
                    isLoading={usersIsLoading}
                    error={usersError}
                    onRetry={() => queryClient.invalidateQueries({ queryKey: ['all-users'] })}
                />
            </MainLayout>
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
