import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const SideBar: React.FC<Props> = ({ children, className, onClick }) => {
    const getContainerClasses = () => {
        const baseClasses = [
            'transition-all duration-800 ease-in-out',
            'border border-gray-200 hover:border-gray-300 rounded-lg',
            'flex flex-col',
        ];

        const hasBgClass = className?.match(/(?:^|\s)(?:\S+:)*bg-[^\s]+/);
        const bgClass = hasBgClass ? '' : ' bg-white';

        return [...baseClasses, bgClass, className || ''].join(' ').trim();
    };

    return (
        <aside onClick={onClick} className={getContainerClasses()}>
            {children}
        </aside>
    );
};

export default SideBar;
