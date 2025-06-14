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

const Container: React.FC<Props> = ({ children, className, onClick, easeIn, isVisible }) => {
    const getContainerClasses = () => {
        let classes = 'bg-white transition-all duration-800 ease-in-out';
        if (easeIn)
            classes += isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8';
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

export default Container;
