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
    gap?: string | null;
};

type Props = BaseProps & (EaseInProps | NoEaseInProps);

const FeatureCard: React.FC<Props> = ({ children, className, onClick, easeIn, isVisible, gap }) => {
    const getContainerClasses = () => {
        const gapUsed = gap || '4';
        const baseClasses = [
            'transition-all duration-800 ease-in-out',
            'border border-gray-200 hover:border-gray-300 rounded-lg',
            `flex flex-col gap-${gapUsed}`,
            'p-6 cursor-pointer',
        ];

        if (easeIn)
            baseClasses.push(isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8');

        const hasBgClass = className?.match(/(?:^|\s)(?:\S+:)*bg-[^\s]+/);
        const bgClass = hasBgClass ? '' : ' bg-white';

        return [...baseClasses, bgClass, className || ''].join(' ').trim();
    };

    return (
        <div onClick={onClick} className={getContainerClasses()}>
            {children}
        </div>
    );
};

export default FeatureCard;
