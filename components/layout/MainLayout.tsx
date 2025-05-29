import Navigation from '@components/shared/Navigation';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    pageName: string;
    children: ReactNode;
    pageTitle?: string;
    isLoading?: boolean;
    isMiddleContent?: boolean;
};

const MainLayout: React.FC<Props> = ({
    pageName,
    pageTitle,
    children,
    isLoading = false,
    isMiddleContent = false,
}: Props) => {
    const getMainClassName = () => {
        let classes = 'main';
        if (isLoading) classes += ' loading';
        if (isMiddleContent) classes += ' middle-content';
        return classes;
    };

    const getContentClassName = () => {
        if (isMiddleContent && !isLoading) {
            return 'main-middle-content';
        }
        return 'main-inner-container';
    };

    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="description" content={pageName + ' page'} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/wacoLogo.ico" />
            </Head>

            <Navigation />

            <main className={getMainClassName()}>
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
                                size={60}
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

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="custom-toast"
            />
        </>
    );
};

export default MainLayout;
