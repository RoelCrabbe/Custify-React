import AuthPageLayout from '@components/layout/AuthPageLayout';
import Link from 'next/link';

const Custom401: React.FC = () => {
    return (
        <>
            <AuthPageLayout pageName={'401 - Unauthorized'} description={'Unauthorized'}>
                <div className="error-page">
                    <div className="error-page__icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>

                    <section className="error-page__content">
                        <h1>401</h1>
                        <h2>Unauthorized</h2>

                        <p>
                            Your session has expired or you are not logged in. Please log in again.
                        </p>
                    </section>

                    <div className="error-page__actions">
                        <Link href="/" className="error-page__button error-page__button--primary">
                            Go to Home
                        </Link>
                        <Link
                            href="/login"
                            className="error-page__button error-page__button--secondary">
                            Log In
                        </Link>
                    </div>
                </div>
            </AuthPageLayout>
        </>
    );
};

export default Custom401;
