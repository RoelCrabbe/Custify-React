import AuthPageLayout from '@components/layout/AuthPageLayout';
import Button from '@components/ui/Button';
import { ROUTES } from '@config/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom403: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <AuthPageLayout pageName={'403 - Forbidden'} description={'Forbidden'}>
            <div className="error-page">
                <div className="error-page__icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>

                <section className="error-page__content">
                    <h1>403</h1>
                    <h2>Access forbidden</h2>

                    <p>
                        You don't have permission to access this page. This could be because you're
                        not logged in or you don't have the required permissions.
                    </p>
                </section>

                <div className="error-page__actions">
                    <Link
                        href={ROUTES.AUTH.LOGIN}
                        className={'button-base button-primary button-md'}>
                        Go to Login
                    </Link>
                    <Button.Secondary onClick={handleGoBack}>Go Back</Button.Secondary>
                </div>
            </div>
        </AuthPageLayout>
    );
};

export default Custom403;
