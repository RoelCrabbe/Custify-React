import ErrorMessage from '@components/layout/ErrorMessage';
import MainLayout from '@components/layout/MainLayout';
import UserRegisterForm from '@components/users/UserRegisterForm';
import { usePageLoadTime } from '@hooks/usePageLoadTime';
import { userService } from '@services/userService';
import { ErrorLabelMessage } from '@types';
import { t } from 'i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { handleErrorLabel } from 'utils/handlers/handleUnexpectedError';

const Register: React.FC = () => {
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();
    usePageLoadTime();

    const handleRegister = async (data: any) => {
        setErrorLabelMessage(undefined);

        try {
            const userResponse = await userService.registerUser(data);
            const userJson = await userResponse.json();

            if (!userResponse.ok) {
                handleErrorLabel(userJson.message, setErrorLabelMessage);
                return;
            }

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: userJson.token,
                    fullname: userJson.fullName,
                    username: userJson.userName,
                    role: userJson.role,
                }),
            );

            toast.success(t('pages.login.success'));

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            handleErrorLabel(error, setErrorLabelMessage);
        }
    };

    return (
        <>
            <MainLayout pageName={'Register'} isMiddleContent>
                <UserRegisterForm
                    onSubmit={handleRegister}
                    onClearError={() => setErrorLabelMessage(undefined)}>
                    {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
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
