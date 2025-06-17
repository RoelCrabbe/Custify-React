import Navigation from '@components/layout/Navigation';
import PageHead, { PageHeadProps } from '@components/layout/PageHead';
import PageLoader from '@components/layout/PageLoader';
import React, { ReactNode } from 'react';

interface AuthPageLayoutProps extends PageHeadProps {
    children: ReactNode;
    isLoading?: boolean;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
    pageName,
    children,
    isLoading = false,
}: AuthPageLayoutProps) => {
    const getMainClassName = () => {
        return 'auth-layout';
    };

    const getSpinnerClassName = () => {
        return 'auth-layout__loading';
    };

    const getContentClassName = () => {
        return 'auth-layout__content';
    };

    return (
        <>
            <PageHead pageName={pageName} />
            <Navigation />
            {/* <SettingsWidget /> */}

            <main className={getMainClassName()}>
                {isLoading ? (
                    <PageLoader pageName={pageName} className={getSpinnerClassName()} />
                ) : (
                    <div className={getContentClassName()}>{children}</div>
                )}
            </main>
        </>
    );
};

export default AuthPageLayout;
