import AdminSidebar from '@components/layout/AdminSidebar';
import Navigation from '@components/layout/Navigation';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { ClipLoader } from 'react-spinners';

type BaseProps = {
    pageName: string;
    children: ReactNode;
    pageTitle?: string;
    isLoading?: boolean;
};

type MiddleOnly = {
    isMiddleContent: true;
    isSideBarContent?: false;
};

type SideOnly = {
    isSideBarContent: true;
    isMiddleContent?: false;
};

type Neutral = {
    isSideBarContent?: false;
    isMiddleContent?: false;
};

type Props = BaseProps & (MiddleOnly | SideOnly | Neutral);

const PageLayout: React.FC<Props> = ({
    pageName,
    pageTitle,
    children,
    isLoading = false,
    isSideBarContent = false,
    isMiddleContent = false,
}: Props) => {
    const getMainClassName = () => {
        let classes = 'main';
        if (isLoading) classes += ' loading';
        if (isSideBarContent) classes += ' sidebar-content';
        if (isMiddleContent) classes += ' middle-content';
        return classes;
    };

    const getContentClassName = () => {
        if (isMiddleContent && !isLoading) return 'main-middle-content';
        if (isSideBarContent) return 'main-sidebar-content';
        return 'main-inner-container';
    };

    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="description" content={pageName + ' page'} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!isSideBarContent && <Navigation />}

            <main className={getMainClassName()}>
                {isSideBarContent && <AdminSidebar />}

                <div className="main-div-container">
                    {(isLoading || pageTitle) && (
                        <header className="main-head-container">
                            <div className="main-title-container">
                                <div className="main-title">
                                    <h1>{pageTitle || pageName}</h1>
                                </div>
                            </div>
                        </header>
                    )}

                    {isLoading ? (
                        <div className="spinner-container">
                            <ClipLoader
                                color="#3B82F6"
                                size={96}
                                cssOverride={{
                                    borderWidth: '4px',
                                }}
                                aria-label="Loading"
                            />
                        </div>
                    ) : (
                        <div className={getContentClassName()}>{children}</div>
                    )}
                </div>
            </main>
        </>
    );
};

export default PageLayout;
