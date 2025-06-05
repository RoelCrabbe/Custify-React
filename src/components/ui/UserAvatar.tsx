import React from 'react';

interface Props {
    firstName?: string;
    lastName?: string;
}

const UserAvatar: React.FC<Props> = ({ firstName = '', lastName = '' }: Props) => {
    const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

    return (
        <>
            <div className="flex-shrink-0 h-10 w-10">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{initials}</span>
                </div>
            </div>
        </>
    );
};

export default UserAvatar;
