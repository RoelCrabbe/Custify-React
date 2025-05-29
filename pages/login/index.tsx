import ErrorMessage from '@components/layout/ErrorMessage';
import MainLayout from '@components/layout/MainLayout';
import UserLoginForm from '@components/users/UserLoginForm';
import { usePageLoadTime } from '@hooks/usePageLoadTime';
import { userService } from '@services/userService';
import { ErrorLabelMessage } from '@types';
import { t } from 'i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { handleErrorLabel } from 'utils/handlers/handleUnexpectedError';

const Home: React.FC = () => {
    const [errorLabelMessage, setErrorLabelMessage] = useState<ErrorLabelMessage>();
    usePageLoadTime();

    const handleLogin = async (data: any) => {
        setErrorLabelMessage(undefined);

        try {
            const userResponse = await userService.loginUser(data);
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
            <MainLayout pageName={'Login'} isMiddleContent>
                <UserLoginForm
                    onSubmit={handleLogin}
                    onClearError={() => setErrorLabelMessage(undefined)}>
                    {errorLabelMessage && <ErrorMessage errorLabelMessage={errorLabelMessage} />}
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
