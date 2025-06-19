import UserRegisterForm from '@components/auth/UserRegisterForm';
import AuthPageLayout from '@components/layout/AuthPageLayout';
import StatusMessage from '@components/ui/StatusMessage';
import { ROUTES } from '@config/routes';
import { handleErrorLabel, setAuthToken } from '@lib';
import { authService } from '@services/index';
import { LabelMessage } from '@types';
import { useBlockAuthenticated } from 'context/hooks/useAuthGuard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Register: React.FC = () => {
    const router = useRouter();
    const { shouldRender, currentUser } = useBlockAuthenticated(ROUTES.HOME);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const handleRegister = async (data: any) => {
        setLabelMessage(undefined);

        try {
            const userResponse = await authService.registerUser(data);
            const userJson = await userResponse.json();

            if (!userResponse.ok) {
                handleErrorLabel(userJson.message, setLabelMessage);
                return;
            }

            setAuthToken(userJson.token);

            setLabelMessage({
                label: 'Registered Successful!',
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
        <AuthPageLayout pageName={'Register'} description={'Register'} isLoading={!shouldRender}>
            <UserRegisterForm
                onSubmit={handleRegister}
                onClearError={() => setLabelMessage(undefined)}>
                {labelMessage && <StatusMessage labelMessage={labelMessage} />}
            </UserRegisterForm>
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

export default Register;
