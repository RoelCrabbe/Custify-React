import AdminSidebar from '@components/layout/AdminSidebar';
import Navigation from '@components/layout/Navigation';
import PageHead, { PageHeadProps } from '@components/layout/PageHead';
import PageLoader from '@components/layout/PageLoader';
import React, { ReactNode } from 'react';

interface AdminPageLayoutProps extends PageHeadProps {
    children: ReactNode;
    isLoading?: boolean;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
    pageName,
    children,
    isLoading = false,
}: AdminPageLayoutProps) => {
    const getMainClassName = () => {
        return `admin-layout ${isLoading ? 'admin-layout--loading' : ''}`;
    };

    const getSpinnerClassName = () => {
        return 'admin-layout__loading';
    };

    const getContentClassName = () => {
        return 'admin-layout__content';
    };

    return (
        <>
            <PageHead pageName={pageName} />
            <Navigation />

            <main className={getMainClassName()}>
                {isLoading ? (
                    <PageLoader pageName={pageName} className={getSpinnerClassName()} />
                ) : (
                    <>
                        <AdminSidebar />
                        <div className={getContentClassName()}>{children}</div>
                    </>
                )}
            </main>
        </>
    );
};

export default AdminPageLayout;
