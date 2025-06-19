import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    gap?: string | null;
};

const Row: React.FC<Props> = ({ children, className, onClick, gap }) => {
    const getContainerClasses = () => {
        const gapUsed = gap || '4';
        const baseClasses = [
            'transition-all duration-800 ease-in-out',
            'flex items-center',
            `gap-${gapUsed}`,
        ];

        return [...baseClasses, className || ''].join(' ').trim();
    };

    return (
        <div onClick={onClick} className={getContainerClasses()}>
            {children}
        </div>
    );
};

export default Row;
