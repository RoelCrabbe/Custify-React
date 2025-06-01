import UserLoginForm from '@components/auth/UserLoginForm';
import PageLayout from '@components/layout/PageLayout';
import StatusMessage from '@components/layout/StatusMessage';
import { useBlockAuthenticated } from '@hooks/useAuthGuard';
import { handleErrorLabel } from '@lib';
import { authService } from '@services/index';
import { LabelMessage } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import { useState } from 'react';

const Login: React.FC = () => {
    const { shouldRender, currentUser } = useBlockAuthenticated('/');
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const handleLogin = async (data: any) => {
        setLabelMessage(undefined);

        try {
            const userResponse = await authService.loginUser(data);
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

            setTimeout(() => {
                router.push('/');
                currentUser.refetch();
            }, 2000);
        } catch (error) {
            handleErrorLabel(error, setLabelMessage);
        }
    };

    return (
        <>
            <PageLayout pageName={'Login'} isMiddleContent isLoading={!shouldRender}>
                <UserLoginForm
                    onSubmit={handleLogin}
                    onClearError={() => setLabelMessage(undefined)}>
                    {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                </UserLoginForm>
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

export default Login;
