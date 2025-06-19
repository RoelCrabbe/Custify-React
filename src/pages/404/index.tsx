import AuthPageLayout from '@components/layout/AuthPageLayout';
import Button from '@components/ui/Button';
import { ROUTES } from '@config/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom404: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <AuthPageLayout pageName={'404 - Page Not Found'} description={'Page Not Found'}>
            <div className="error-page">
                <div className="error-page__icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <section className="error-page__content">
                    <h1>404</h1>
                    <h2>Page not found</h2>

                    <p>
                        Sorry, we couldn't find the page you're looking for. The page might have
                        been moved, deleted, or you entered the wrong URL.
                    </p>
                </section>

                <div className="error-page__actions">
                    <Link href={ROUTES.HOME} className={'button-base button-primary button-md'}>
                        Go to Home
                    </Link>
                    <Button.Secondary onClick={handleGoBack}>Go Back</Button.Secondary>
                </div>
            </div>
        </AuthPageLayout>
    );
};

export default Custom404;
