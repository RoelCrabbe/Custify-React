import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
    text: string;
    icon: IconDefinition;
    color: string;
    size?: 'sm' | 'md';
    className?: string;
}

const badgeSizes = {
    sm: 'px-2.5 py-1',
    md: 'px-4 py-2',
};

const Badge: React.FC<Props> = ({ text, icon, color, size = 'md', className = '' }: Props) => {
    const paddingClass = badgeSizes[size] || badgeSizes.md;

    return (
        <span
            className={`inline-flex items-center gap-2 ${paddingClass} rounded-full text-xs font-medium w-fit ${color} ${className}`}>
            <FontAwesomeIcon icon={icon} className="user-management__icon" />
            {text}
        </span>
    );
};

export default Badge;
