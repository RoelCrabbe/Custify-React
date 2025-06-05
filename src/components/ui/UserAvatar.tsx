import React from 'react';

interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    firstName?: string;
    lastName?: string;
}

const sizeClasses = {
    xs: { container: 'h-6 w-6', text: 'text-xs' },
    sm: { container: 'h-10 w-10', text: 'text-sm' },
    md: { container: 'h-14 w-14', text: 'text-lg' },
    lg: { container: 'h-20 w-20', text: 'text-2xl' },
    xl: { container: 'h-24 w-24', text: 'text-3xl' },
    xxl: { container: 'h-32 w-32', text: 'text-4xl' },
};

const UserAvatar: React.FC<Props> = ({ size = 'sm', firstName = '', lastName = '' }: Props) => {
    const initials = `${firstName[0] || '?'}${lastName[0] || '?'}`.toUpperCase();

    const { container, text } = sizeClasses[size] || sizeClasses.sm;

    return (
        <div className={`flex-shrink-0 ${container}`}>
            <div
                className={`${container} rounded-full bg-blue-100 flex items-center justify-center`}>
                <span className={`${text} font-medium text-blue-600`}>{initials}</span>
            </div>
        </div>
    );
};

export default UserAvatar;
