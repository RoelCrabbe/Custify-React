import { ClipLoader } from 'react-spinners';

interface PageLoaderProps {
    pageName: string;
    className: string;
    size?: number;
    color?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
    pageName,
    className,
    size = 96,
    color = '#2563EB',
}) => {
    return (
        <>
            <header className="page-loader__header">
                <h1>{pageName}</h1>
            </header>

            <div className={className}>
                <ClipLoader
                    color={color}
                    size={size}
                    cssOverride={{
                        borderWidth: '4px',
                    }}
                    aria-label="Loading"
                />
            </div>
        </>
    );
};

export default PageLoader;
