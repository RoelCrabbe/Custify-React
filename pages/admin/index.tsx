import MainLayout from '@components/layout/MainLayout';
import { useCurrentUser } from '@provider/UserProvider';
import { userService } from '@services/userService';
import { useQuery } from '@tanstack/react-query';
import { User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getToken } from 'utils/tokenUtils';

const Admin: React.FC = () => {
    const currentUser = useCurrentUser();

    const { data, refetch } = useQuery<User[]>({
        queryKey: ['all-users'],
        staleTime: 10 * 60 * 1000,
        enabled: getToken() !== null,
        queryFn: async () => {
            const response = await userService.getAllUsers();
            return response.ok ? ((await response.json()) as User[]) : [];
        },
    });

    return (
        <>
            <MainLayout pageName={'Admin Panel'} isSideBarContent>
                <p>data</p>
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
