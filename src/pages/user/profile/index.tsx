import MainPageLayout from '@components/layout/MainPageLayout';
import ProfileEditOverview from '@components/user/ProfileEditOverview';
import ProfileOverview from '@components/user/ProfileOverview';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { User } from '@types';
import { useState } from 'react';

const UserProfilePage: React.FC = () => {
    const { shouldRender, currentUser } = useRequireAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<User | null>(currentUser.getValue());

    const handleUseUpdate = (updatedUser: User) => {
        setUser((prevUser) => (prevUser?.id === updatedUser.id ? updatedUser : prevUser));
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const isLoading = !shouldRender && !user;

    return (
        <>
            <MainPageLayout pageName="Profile" isLoading={isLoading}>
                {user &&
                    (isEditing ? (
                        <ProfileEditOverview
                            user={user}
                            onClose={handleEdit}
                            onUpdate={handleUseUpdate}
                        />
                    ) : (
                        <ProfileOverview user={user} onEdit={handleEdit} />
                    ))}
            </MainPageLayout>
        </>
    );
};

export default UserProfilePage;
