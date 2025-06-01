import PageLayout from '@components/layout/PageLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom403: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <PageLayout pageName="403 - Forbidden" isMiddleContent>
                <div className="error-page-content">
                    <div className="error-page-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>

                    <section className="error-page-info">
                        <h1 className="error-page-code">403</h1>
                        <h2 className="error-page-title">Access forbidden</h2>

                        <p className="error-page-description">
                            You don't have permission to access this page. This could be because
                            you're not logged in or you don't have the required permissions.
                        </p>
                    </section>

                    <div className="error-page-actions">
                        <Link href="/" className="error-page-button error-page-button-primary">
                            Go to Login
                        </Link>
                        <button
                            onClick={handleGoBack}
                            className="error-page-button error-page-button-secondary">
                            Go Back
                        </button>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default Custom403;
