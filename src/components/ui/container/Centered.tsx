import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Centered: React.FC<Props> = ({ children, className, onClick }) => {
    const getContainerClasses = () => {
        let baseClasses = 'transition-all duration-800 ease-in-out';
        baseClasses += ` flex items-center justify-center`;
        return `${baseClasses} ${className || ''}`.trim();
    };

    return (
        <>
            <div onClick={onClick} className={getContainerClasses()}>
                {children}
            </div>
        </>
    );
};

export default Centered;
