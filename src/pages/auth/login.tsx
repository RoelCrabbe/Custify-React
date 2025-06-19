import UserLoginForm from '@components/auth/UserLoginForm';
import AuthPageLayout from '@components/layout/AuthPageLayout';
import StatusMessage from '@components/ui/StatusMessage';
import { ROUTES } from '@config/routes';
import { useBlockAuthenticated } from '@hooks/useAuthGuard';
import { handleErrorLabel, setAuthToken } from '@lib';
import { authService } from '@services/index';
import { LabelMessage } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login: React.FC = () => {
    const router = useRouter();
    const { shouldRender, currentUser } = useBlockAuthenticated(ROUTES.HOME);
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

            setAuthToken(userJson.token);

            setLabelMessage({
                label: 'Login Successful!',
                message: 'Redirecting you to the dashboard...',
                type: 'success',
            });

            setTimeout(() => {
                router.push(ROUTES.HOME);
                currentUser.refetch();
            }, 2000);
        } catch (error) {
            handleErrorLabel(error, setLabelMessage);
        }
    };

    return (
        <AuthPageLayout pageName={'Login'} description={'Login'} isLoading={!shouldRender}>
            <UserLoginForm onSubmit={handleLogin} onClearError={() => setLabelMessage(undefined)}>
                {labelMessage && <StatusMessage labelMessage={labelMessage} />}
            </UserLoginForm>
        </AuthPageLayout>
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
