import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Centered: React.FC<Props> = ({ children, className, onClick }) => {
    const getContainerClasses = () => {
        const baseClasses = [
            'transition-all duration-800 ease-in-out',
            'flex items-center justify-center',
        ];

        return [...baseClasses, className || ''].join(' ').trim();
    };

    return (
        <div onClick={onClick} className={getContainerClasses()}>
            {children}
        </div>
    );
};

export default Centered;
