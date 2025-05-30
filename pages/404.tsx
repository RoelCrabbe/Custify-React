import MainLayout from '@components/layout/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom404: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <MainLayout pageName="404 - Page Not Found" isMiddleContent>
                <div className="error-page-content">
                    <div className="error-page-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <section className="error-page-info">
                        <h1 className="error-page-code">404</h1>
                        <h2 className="error-page-title">Page not found</h2>

                        <p className="error-page-description">
                            Sorry, we couldn't find the page you're looking for. The page might have
                            been moved, deleted, or you entered the wrong URL.
                        </p>
                    </section>

                    <div className="error-page-actions">
                        <Link href="/" className="error-page-button error-page-button-primary">
                            Go to Home
                        </Link>
                        <button
                            onClick={handleGoBack}
                            className="error-page-button error-page-button-secondary">
                            Go Back
                        </button>
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default Custom404;
