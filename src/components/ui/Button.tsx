import React, { memo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onClick: (e: React.FormEvent) => void;
    className?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    isActive?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<Props> = ({
    children,
    onClick,
    className,
    isLoading = false,
    isDisabled = false,
    isActive = true,
    type = 'button',
}: Props) => {
    const getButtonClasses = () => {
        let classes = 'button-base ';
        if (isLoading) {
            classes += 'button-loading';
        } else if (isDisabled) {
            classes += 'button-disabled';
        } else if (isActive) {
            classes += 'button-primary';
        } else {
            classes += 'button-secondary';
        }
        if (className) classes += ` ${className}`;
        return classes;
    };

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={isDisabled || isLoading}
                className={getButtonClasses()}>
                {children}
            </button>
        </>
    );
};

export default memo(Button);
