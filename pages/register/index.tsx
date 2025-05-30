import MainLayout from '@components/layout/MainLayout';
import StatusMessage from '@components/layout/StatusMessage';
import UserRegisterForm from '@components/users/UserRegisterForm';
import { userService } from '@services/userService';
import { LabelMessage } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import React, { useState } from 'react';
import { handleErrorLabel } from 'utils/handlers/handleUnexpectedError';

const Register: React.FC = () => {
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const handleRegister = async (data: any) => {
        setLabelMessage(undefined);

        try {
            const userResponse = await userService.registerUser(data);
            const userJson = await userResponse.json();

            if (!userResponse.ok) {
                handleErrorLabel(userJson.message, setLabelMessage);
                return;
            }

            localStorage.setItem(
                'authToken',
                JSON.stringify({
                    token: userJson.token,
                }),
            );

            setLabelMessage({
                label: 'Registered Successful!',
                message: 'Redirecting you to the dashboard...',
                type: 'success',
            });

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            handleErrorLabel(error, setLabelMessage);
        }
    };

    return (
        <>
            <MainLayout pageName={'Register'} isMiddleContent>
                <UserRegisterForm
                    onSubmit={handleRegister}
                    onClearError={() => setLabelMessage(undefined)}>
                    {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                </UserRegisterForm>
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

export default Register;
