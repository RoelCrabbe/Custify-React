import React from 'react';

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    hasBorder?: boolean;
    isAside?: boolean;
    onClick?: () => void;
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

type WithModal = {
    isModal: boolean;
};

type WithoutModal = {
    isModal?: never;
};

type Props = (WithEaseIn | WithoutEaseIn) &
    (WithColumn | WithoutColumn) &
    (WithModal | WithoutModal) &
    BaseProps;

const ContainerComponent: React.FC<Props> = ({
    children,
    className,
    hasBorder,
    isAside,
    easeIn,
    isVisible,
    isModal,
    isColumn,
    gap,
    onClick,
}: Props) => {
    const getContainerClasses = () => {
        if (isModal)
            return 'fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50';
        let classes = 'bg-white transition-all duration-800 ease-in-out';

        if (hasBorder) classes += ' border border-gray-200 hover:border-gray-300 rounded-lg';
        if (easeIn)
            classes += isVisible ? ' opacity-100 translate-y-0' : ' opacity-0 translate-y-8';
        if (isColumn) classes += ` flex flex-col gap-${gap}`;
        if (className) classes += ` ${className}`;
        return classes.trim();
    };

    const getContainer = () => {
        if (isAside)
            return (
                <aside onClick={onClick} className={getContainerClasses()}>
                    {children}
                </aside>
            );
        return (
            <div onClick={onClick} className={getContainerClasses()}>
                {children}
            </div>
        );
    };

    return <>{getContainer()}</>;
};

type CardProps = Omit<BaseProps, 'hasBorder'> & WithoutEaseIn & WithoutColumn;
type AnimatedCardProps = Omit<BaseProps, 'hasBorder'> & { isVisible: boolean } & WithoutColumn;
type ColumnProps = Omit<BaseProps, never> & WithoutEaseIn & { gap?: string };
type AnimatedColumnProps = Omit<BaseProps, never> & { isVisible: boolean; gap?: string };
type StatCardProps = Omit<BaseProps, 'className'> & { isVisible: boolean; className?: string };
type FeatureCardProps = Omit<BaseProps, 'className'> & { isVisible: boolean; className?: string };
type SidebarProps = Omit<BaseProps, 'hasBorder' | 'isColumn'> & WithoutEaseIn;
type ModalProps = BaseProps & WithoutModal;

const Card: React.FC<CardProps> = (props) => {
    const formattedProps: Props = {
        ...props,
        hasBorder: true,
    };
    return <ContainerComponent {...formattedProps} />;
};

const Column: React.FC<ColumnProps> = (props) => {
    const { gap = '4', ...restProps } = props;
    const formattedProps: Props = {
        ...restProps,
        isColumn: true,
        gap,
    };
    return <ContainerComponent {...formattedProps} />;
};

const AnimatedCard: React.FC<AnimatedCardProps> = (props) => {
    const formattedProps: Props = {
        ...props,
        hasBorder: true,
        easeIn: true,
    };
    return <ContainerComponent {...formattedProps} />;
};

const AnimatedColumn: React.FC<AnimatedColumnProps> = (props) => {
    const { gap = '4', ...restProps } = props;
    const formattedProps: Props = {
        ...restProps,
        isColumn: true,
        gap,
        easeIn: true,
    };
    return <ContainerComponent {...formattedProps} />;
};

const StatCard: React.FC<StatCardProps> = (props) => {
    const { className = '', ...restProps } = props;
    const formattedProps: Props = {
        ...restProps,
        hasBorder: true,
        easeIn: true,
        isColumn: true,
        gap: '4',
        className: `p-6 text-center ${className}`.trim(),
    };
    return <ContainerComponent {...formattedProps} />;
};

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
    const { className = '', ...restProps } = props;
    const formattedProps: Props = {
        ...restProps,
        hasBorder: true,
        easeIn: true,
        isColumn: true,
        gap: '4',
        className: `p-6 cursor-pointer ${className}`.trim(),
    };
    return <ContainerComponent {...formattedProps} />;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
    const formattedProps: Props = {
        ...props,
        isAside: true,
        hasBorder: true,
        isColumn: true,
        gap: '0',
    };
    return <ContainerComponent {...formattedProps} />;
};

const Modal: React.FC<ModalProps> = (props) => {
    const formattedProps: Props = {
        ...props,
        isModal: true,
    };
    return <ContainerComponent {...formattedProps} />;
};

type FormContainerType = typeof ContainerComponent & {
    Card: typeof Card;
    Column: typeof Column;
    AnimatedCard: typeof AnimatedCard;
    AnimatedColumn: typeof AnimatedColumn;
    StatCard: typeof StatCard;
    FeatureCard: typeof FeatureCard;
    Sidebar: typeof Sidebar;
    Modal: typeof Modal;
};

const FormContainer = ContainerComponent as FormContainerType;

FormContainer.Card = Card;
FormContainer.Column = Column;
FormContainer.AnimatedCard = AnimatedCard;
FormContainer.AnimatedColumn = AnimatedColumn;
FormContainer.StatCard = StatCard;
FormContainer.FeatureCard = FeatureCard;
FormContainer.Sidebar = Sidebar;
FormContainer.Modal = Modal;

export default FormContainer;
