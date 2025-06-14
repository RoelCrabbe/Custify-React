import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Modal: React.FC<Props> = ({ children, className, onClick }: Props) => {
    const getContainerClasses = () => {
        const baseClasses = [
            'fixed inset-0',
            'flex items-center justify-center',
            'bg-gray-600 bg-opacity-50',
            'z-50',
        ];

        return [...baseClasses, className || ''].join(' ').trim();
    };

    return (
        <>
            <div onClick={onClick} className={getContainerClasses()}>
                {children}
            </div>
        </>
    );
};

export default Modal;
