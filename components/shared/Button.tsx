import { useRenderLogger } from '@hooks/useRenderLogger';
import React, { memo, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    onClick: (e: React.FormEvent) => void;
    isLoading?: boolean;
    isDisabled?: boolean;
    isActive?: boolean;
    type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({
    children,
    onClick,
    isLoading = false,
    isDisabled = false,
    isActive = true,
    type = 'button',
}: Props) => {
    useRenderLogger('Button');

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
