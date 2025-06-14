import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const SideBar: React.FC<Props> = ({ children, className, onClick }) => {
    const getContainerClasses = () => {
        let classes = 'bg-white transition-all duration-800 ease-in-out';
        classes += ' border border-gray-200 hover:border-gray-300 rounded-lg';
        classes += ` flex flex-col`;

        if (className) classes += ` ${className}`;
        return classes.trim();
    };

    return (
        <>
            <aside onClick={onClick} className={getContainerClasses()}>
                {children}
            </aside>
        </>
    );
};

export default SideBar;
