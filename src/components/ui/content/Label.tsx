import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Label: React.FC<Props> = ({ children, className, onClick }) => {
    const getContentClasses = () => {
        const baseClasses = 'text-xs font-medium uppercase tracking-wide';

        const hasTextColor = className?.match(/(?:^|\s)(?:\S+:)*text-[^\s]+/);
        const textClass = hasTextColor ? '' : ' text-gray-500';
        return `${baseClasses}${textClass} ${className || ''}`.trim();
    };

    return (
        <label onClick={onClick} className={getContentClasses()}>
            {children}
        </label>
    );
};

export default Label;
