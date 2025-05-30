import React, { memo } from 'react';

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    hasBorder?: boolean;
};

type WithEaseIn = {
    easeIn: true;
    isVisible: boolean;
};

type WithoutEaseIn = {
    easeIn?: false;
    isVisible?: never;
};

type WithColumn = {
    isColumn: true;
    gap: string;
};

type WithoutColumn = {
    isColumn?: false;
    gap?: never;
};

type Props = (WithEaseIn | WithoutEaseIn) & (WithColumn | WithoutColumn) & BaseProps;

const FormContainer: React.FC<Props> = ({
    children,
    className,
    hasBorder,
    easeIn,
    isVisible,
    isColumn,
    gap,
}: Props) => {
    const getButtonClasses = () => {
        let classes = 'bg-white transition-all duration-800';
        if (hasBorder) classes += ' border border-gray-200 hover:border-gray-300 rounded-lg';
        if (easeIn)
            classes += isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8';
        if (isColumn) classes += ` flex flex-col gap-${gap}`;
        if (className) classes += ` ${className}`;
        return classes;
    };

    return (
        <>
            <div className={getButtonClasses()}>{children}</div>
        </>
    );
};

export default memo(FormContainer);
