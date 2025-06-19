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
    bordered?: boolean;
};

type Props = BaseProps & (EaseInProps | NoEaseInProps);

const Container: React.FC<Props> = ({
    children,
    className,
    onClick,
    easeIn,
    isVisible,
    bordered = false,
}) => {
    const getContainerClasses = () => {
        const baseClasses = ['transition-all duration-800 ease-in-out'];

        if (bordered) baseClasses.push('border border-gray-200 hover:border-gray-300 rounded-lg');

        if (easeIn)
            baseClasses.push(isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8');

        return [...baseClasses, className || ''].join(' ').trim();
    };

    return (
        <div onClick={onClick} className={getContainerClasses()}>
            {children}
        </div>
    );
};

export default Container;
