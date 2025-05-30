import MainLayout from '@components/layout/MainLayout';
import StatusMessage from '@components/layout/StatusMessage';
import UserLoginForm from '@components/users/UserLoginForm';
import { useCurrentUser } from '@provider/UserProvider';
import { userService } from '@services/userService';
import { LabelMessage } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import { useState } from 'react';
import { handleErrorLabel } from 'utils/handlers/handleUnexpectedError';

const Home: React.FC = () => {
    const user = useCurrentUser();
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const handleLogin = async (data: any) => {
        setLabelMessage(undefined);

        try {
            const userResponse = await userService.loginUser(data);
            const userJson = await userResponse.json();

            if (!userResponse.ok) {
                handleErrorLabel(userJson.message, setLabelMessage);
                return;
            }

            localStorage.setItem('authToken', userJson.token);

            setLabelMessage({
                label: 'Login Successful!',
                message: 'Redirecting you to the dashboard...',
                type: 'success',
            });

            user.refetch();

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            handleErrorLabel(error, setLabelMessage);
        }
    };

    return (
        <>
            <MainLayout pageName={'Login'} isMiddleContent>
                <UserLoginForm
                    onSubmit={handleLogin}
                    onClearError={() => setLabelMessage(undefined)}>
                    {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                </UserLoginForm>
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

export default Home;
