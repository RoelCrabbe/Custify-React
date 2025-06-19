import AuthPageLayout from '@components/layout/AuthPageLayout';
import Button from '@components/ui/Button';
import { ROUTES } from '@config/routes';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LogoutPage: React.FC = () => {
    const router = useRouter();
    const { currentUser } = useRequireAuth();
    const [countdown, setCountdown] = useState(5);

    const redirectTo = ROUTES.HOME;
    const delay = 5000;

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const redirectTimer = setTimeout(() => {
            currentUser.logout();
            router.push(redirectTo);
        }, delay);

        return () => {
            clearInterval(countdownInterval);
            clearTimeout(redirectTimer);
        };
    }, [router, currentUser, redirectTo]);

    const handleImmediateRedirect = () => {
        currentUser.logout();
        router.push(redirectTo);
    };

    return (
        <AuthPageLayout pageName={'Logging Out'} description={'Logging Out'}>
            <div className="error-page">
                <div className="error-page__icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                </div>

                <section className="error-page__content">
                    <h2>You're being logged out</h2>

                    <p>
                        Thank you for using Custify. You will be redirected to the home page in{' '}
                        <span>{countdown}</span> second
                        {countdown !== 1 ? 's' : ''}.
                    </p>
                </section>

                <div className="error-page__actions">
                    <Button.Primary onClick={handleImmediateRedirect} size={'lg'}>
                        Go to Home Now
                    </Button.Primary>
                </div>
            </div>
        </AuthPageLayout>
    );
};

export default LogoutPage;
