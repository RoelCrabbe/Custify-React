import React from 'react';

type EaseInProps = {
    easeIn: true;
    isVisible: boolean;
};

type NoEaseInProps = {
    easeIn?: false;
    isVisible?: never;
};

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

type Props = BaseProps & (EaseInProps | NoEaseInProps);

const Card: React.FC<Props> = ({ children, className, onClick, easeIn, isVisible }) => {
    const getContainerClasses = () => {
        let baseClasses =
            'transition-all duration-800 ease-in-out border border-gray-200 hover:border-gray-300 rounded-lg';

        if (easeIn)
            baseClasses += isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8';

        const hasBgClass = className?.match(/(?:^|\s)(?:\S+:)*bg-[^\s]+/);
        const bgClass = hasBgClass ? '' : ' bg-white';
        return `${baseClasses}${bgClass} ${className || ''}`.trim();
    };

    return (
        <>
            <div onClick={onClick} className={getContainerClasses()}>
                {children}
            </div>
        </>
    );
};

export default Card;
