import Navigation from '@components/layout/Navigation';
import PageHead, { PageHeadProps } from '@components/layout/PageHead';
import PageLoader from '@components/layout/PageLoader';
import SettingsWidget from '@components/layout/SettingsWidget';
import React, { ReactNode } from 'react';

interface MainPageLayoutProps extends PageHeadProps {
    children: ReactNode;
    isLoading?: boolean;
}

const MainPageLayout: React.FC<MainPageLayoutProps> = ({
    pageName,
    children,
    isLoading = false,
}: MainPageLayoutProps) => {
    const getMainClassName = () => {
        return 'main-layout';
    };

    const getSpinnerClassName = () => {
        return 'main-layout__loading';
    };

    const getContentClassName = () => {
        return 'main-layout__content';
    };

    return (
        <>
            <PageHead pageName={pageName} />
            <Navigation />
            <SettingsWidget />

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

export default MainPageLayout;
