import Navigation from '@components/layout/Navigation';
import PageHead, { PageHeadProps } from '@components/layout/PageHead';
import SettingsWidget from '@components/layout/SettingsWidget';
import React, { ReactNode } from 'react';
import { ClipLoader } from 'react-spinners';

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
            <SettingsWidget />

            <main className={getMainClassName()}>
                {isLoading ? (
                    <>
                        <header>
                            <h1>{pageName}</h1>
                        </header>

                        <div className={getSpinnerClassName()}>
                            <ClipLoader
                                color="#2563EB"
                                size={96}
                                cssOverride={{
                                    borderWidth: '4px',
                                }}
                                aria-label="Loading"
                            />
                        </div>
                    </>
                ) : (
                    <div className={getContentClassName()}>{children}</div>
                )}
            </main>
        </>
    );
};

export default AuthPageLayout;
