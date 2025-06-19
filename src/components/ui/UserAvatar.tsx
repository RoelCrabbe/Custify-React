import { User } from '@types'; // Adjust import path as needed
import React from 'react';

interface Props {
    user: User;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const userAvatarSizes = {
    xs: { container: 'h-6 w-6', text: 'text-xs' },
    sm: { container: 'h-10 w-10', text: 'text-sm' },
    md: { container: 'h-14 w-14', text: 'text-lg' },
    lg: { container: 'h-20 w-20', text: 'text-2xl' },
    xl: { container: 'h-24 w-24', text: 'text-3xl' },
    xxl: { container: 'h-40 w-40', text: 'text-4xl' },
};

const UserAvatar: React.FC<Props> = ({ user, size = 'md' }: Props) => {
    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    const { container, text } = userAvatarSizes[size] || userAvatarSizes.sm;

    return (
        <div className={`flex-shrink-0 ${container}`}>
            {user.profileImage ? (
                <img
                    src={user.profileImage.url}
                    alt={user.profileImage.altText}
                    className={`${container} rounded-full object-cover border border-gray-200 bg-white`}
                />
            ) : (
                <div
                    className={`${container} flex items-center justify-center rounded-full border bg-blue-100 border-blue-400`}>
                    <span className={`${text} font-medium text-blue-600`}>{initials}</span>
                </div>
            )}
        </div>
    );
};

export default UserAvatar;
