import React from 'react';

type Props = {
    children: React.ReactNode;
    index?: string;
    className?: string;
    onClick?: () => void;
};

const Modal: React.FC<Props> = ({ children, index = '50', className, onClick }: Props) => {
    const getContainerClasses = () => {
        const indexUsed = index || '50';
        const baseClasses = [
            'fixed inset-0',
            'flex items-center justify-center',
            'bg-gray-600 bg-opacity-50',
            `z-${indexUsed}`,
        ];

        return [...baseClasses, className || ''].join(' ').trim();
    };

    return (
        <div onClick={onClick} className={getContainerClasses()}>
            {children}
        </div>
    );
};

export default Modal;
