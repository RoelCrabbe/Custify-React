import Head from 'next/head';

export interface PageHeadProps {
    pageName: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
}

const PageHead: React.FC<PageHeadProps> = ({
    pageName,
    description,
    keywords,
    ogImage,
    canonicalUrl,
}: PageHeadProps) => {
    const defaultDescription = description || `${pageName} page`;
    const siteTitle = 'Custify';
    const fullTitle = pageName === 'Home' ? siteTitle : `${pageName} | ${siteTitle}`;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={defaultDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {keywords && <meta name="keywords" content={keywords} />}

            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={defaultDescription} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={defaultDescription} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </Head>
    );
};

export default PageHead;
