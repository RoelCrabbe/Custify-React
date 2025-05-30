import MainLayout from '@components/layout/MainLayout';
import { useCurrentUser } from '@provider/UserProvider';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Admin: React.FC = () => {
    const currentUser = useCurrentUser();

    return (
        <>
            <MainLayout pageName={'Admin Panel'} isSideBarContent>
                <p></p>
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
