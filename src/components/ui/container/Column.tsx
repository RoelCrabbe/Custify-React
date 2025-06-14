import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    gap?: string | null;
};

const Column: React.FC<Props> = ({ children, className, onClick, gap }) => {
    const getContainerClasses = () => {
        const gapUsed = gap || '4';
        let classes = 'transition-all duration-800 ease-in-out';

        classes += ` flex flex-col gap-${gapUsed}`;
        if (className) classes += ` ${className}`;
        return classes.trim();
    };

    return (
        <>
            <div onClick={onClick} className={getContainerClasses()}>
                {children}
            </div>
        </>
    );
};

export default Column;
