import React, { ReactNode } from 'react';

type BaseProps = {
    children: ReactNode;
    onClick: (e: React.FormEvent) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

type LoadingState = {
    isLoading: true;
    isDisabled?: never;
    variant?: never;
};

type DisabledState = {
    isLoading?: false;
    isDisabled: true;
    variant?: never;
};

type ActiveState = {
    isLoading?: false;
    isDisabled?: false;
    variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
};

type WithSize = {
    size?: 'sm' | 'md' | 'lg';
};

type WithIcon = {
    hasIcon: true;
    iconPosition?: 'left' | 'right';
};

type WithoutIcon = {
    hasIcon?: false;
    iconPosition?: never;
};

type WithFullWidth = {
    fullWidth: true;
};

type WithoutFullWidth = {
    fullWidth?: false;
};

type ButtonProps = BaseProps &
    (LoadingState | DisabledState | ActiveState) &
    WithSize &
    (WithIcon | WithoutIcon) &
    (WithFullWidth | WithoutFullWidth);

const ButtonComponent: React.FC<ButtonProps> = ({
    children,
    onClick,
    className,
    type = 'button',
    disabled,
    isLoading,
    isDisabled,
    variant,
    size,
    hasIcon,
    iconPosition = 'left',
    fullWidth,
}) => {
    const getButtonClasses = () => {
        let classes = 'button-base';

        if (isLoading) {
            classes += ' button-loading';
        } else if (isDisabled || disabled) {
            classes += ' button-disabled';
        } else if (variant) {
            classes += ` button-${variant}`;
        }

        if (size) {
            classes += ` button-${size}`;
        }

        if (hasIcon) {
            classes += ' button-with-icon';
            if (iconPosition === 'right') {
                classes += ' button-icon-right';
            }
        }

        if (fullWidth) {
            classes += ' button-full-width';
        }

        if (className) classes += ` ${className}`;
        return classes;
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled || isLoading || disabled}
            className={getButtonClasses()}>
            {children}
        </button>
    );
};

type PrimaryButtonProps = Omit<BaseProps, never> &
    WithSize &
    (WithIcon | WithoutIcon) &
    (WithFullWidth | WithoutFullWidth);

type SecondaryButtonProps = Omit<BaseProps, never> &
    WithSize &
    (WithIcon | WithoutIcon) &
    (WithFullWidth | WithoutFullWidth);

type DangerButtonProps = Omit<BaseProps, never> &
    WithSize &
    (WithIcon | WithoutIcon) &
    (WithFullWidth | WithoutFullWidth);

type LoadingButtonProps = Omit<BaseProps, never> & WithSize & (WithFullWidth | WithoutFullWidth);

type IconButtonProps = Omit<BaseProps, 'children'> & {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
};

type SubmitButtonProps = Omit<BaseProps, 'type'> &
    WithSize &
    (WithFullWidth | WithoutFullWidth) & {
        isLoading?: boolean;
    };

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ size = 'md', ...props }) => {
    const formattedProps: ButtonProps = {
        ...props,
        size,
        variant: 'primary',
    };
    return <ButtonComponent {...formattedProps} />;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ size = 'md', ...props }) => {
    const formattedProps: ButtonProps = {
        ...props,
        size,
        variant: 'secondary',
    };
    return <ButtonComponent {...formattedProps} />;
};

const DangerButton: React.FC<DangerButtonProps> = ({ size = 'md', ...props }) => {
    const formattedProps: ButtonProps = {
        ...props,
        size,
        variant: 'danger',
    };
    return <ButtonComponent {...formattedProps} />;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({ size = 'md', ...props }) => {
    const formattedProps: ButtonProps = {
        ...props,
        size,
        isLoading: true,
    };
    return <ButtonComponent {...formattedProps} />;
};

const IconButton: React.FC<IconButtonProps> = (props) => {
    const { variant = 'ghost', size = 'md', ...restProps } = props;
    const formattedProps: ButtonProps = {
        ...restProps,
        variant,
        size,
        hasIcon: true,
        className: `button-icon-only ${props.className || ''}`.trim(),
    };
    return <ButtonComponent {...formattedProps} />;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, size = 'md', ...props }) => {
    const formattedProps: ButtonProps = {
        ...props,
        size,
        type: 'submit',
        ...(isLoading ? { isLoading: true } : { variant: 'primary' }),
    };
    return <ButtonComponent {...formattedProps} />;
};

const OutlineButton: React.FC<PrimaryButtonProps> = ({ size = 'md', ...props }) => {
    const formattedProps: ButtonProps = {
        ...props,
        size,
        variant: 'outline',
    };
    return <ButtonComponent {...formattedProps} />;
};

const GhostButton: React.FC<PrimaryButtonProps> = ({ size = 'md', ...props }) => {
    const formattedProps: ButtonProps = {
        ...props,
        size,
        variant: 'ghost',
    };
    return <ButtonComponent {...formattedProps} />;
};

type ButtonSystemType = typeof ButtonComponent & {
    Primary: typeof PrimaryButton;
    Secondary: typeof SecondaryButton;
    Danger: typeof DangerButton;
    Loading: typeof LoadingButton;
    Icon: typeof IconButton;
    Submit: typeof SubmitButton;
    Outline: typeof OutlineButton;
    Ghost: typeof GhostButton;
};

const Button = ButtonComponent as ButtonSystemType;

Button.Primary = PrimaryButton;
Button.Secondary = SecondaryButton;
Button.Danger = DangerButton;
Button.Loading = LoadingButton;
Button.Icon = IconButton;
Button.Submit = SubmitButton;
Button.Outline = OutlineButton;
Button.Ghost = GhostButton;

export default Button;
