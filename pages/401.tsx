import MainLayout from '@components/layout/MainLayout';
import Link from 'next/link';

const Custom401: React.FC = () => {
    return (
        <>
            <MainLayout pageName="401 - Unauthorized" isMiddleContent>
                <div className="error-page-content">
                    <div className="error-page-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>

                    <section className="error-page-info">
                        <h1 className="error-page-code">401</h1>
                        <h2 className="error-page-title">Unauthorized</h2>
                        <p className="error-page-description">
                            Your session has expired or you are not logged in. Please log in again.
                        </p>
                    </section>

                    <div className="error-page-actions">
                        <Link href="/" className="error-page-button error-page-button-primary">
                            Go to Home
                        </Link>
                        <Link
                            href="/login"
                            className="error-page-button error-page-button-secondary">
                            Log In
                        </Link>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default Custom401;
