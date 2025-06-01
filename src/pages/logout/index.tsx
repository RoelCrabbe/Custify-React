import PageLayout from '@components/layout/PageLayout';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LogoutPage: React.FC = () => {
    const router = useRouter();
    const { currentUser } = useRequireAuth();
    const [countdown, setCountdown] = useState(5);

    const redirectTo = '/';
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
    }, [router, currentUser]);

    const handleImmediateRedirect = () => {
        currentUser.logout();
        router.push(redirectTo);
    };

    return (
        <>
            <PageLayout pageName="Logging Out" isMiddleContent>
                <div className="error-page-content">
                    <div className="error-page-icon logout-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </div>

                    <section className="error-page-info">
                        <h1 className="logout-title">You're being logged out</h1>
                        <p className="error-page-description">
                            Thank you for using Custify. You will be redirected to the home page in{' '}
                            <span className="countdown-timer">{countdown}</span> second
                            {countdown !== 1 ? 's' : ''}.
                        </p>
                    </section>

                    <div className="error-page-actions">
                        <button
                            onClick={handleImmediateRedirect}
                            className="error-page-button error-page-button-primary">
                            Go to Home Now
                        </button>
                    </div>

                    <div className="logout-progress">
                        <div className="logout-progress-bar">
                            <div
                                className="logout-progress-fill"
                                style={{
                                    animationDuration: `${delay}ms`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default LogoutPage;
