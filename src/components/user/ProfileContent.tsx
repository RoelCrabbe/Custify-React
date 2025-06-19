import ProfileEditOverview from '@components/user/ProfileEditOverview';
import ProfileOverview from '@components/user/ProfileOverview';
import { useToggle } from '@hooks/useToggle';
import { User } from '@types';

interface Props {
    user: User;
    onUpdate: (updatedUser: User) => void;
}

const ProfileContent: React.FC<Props> = ({ user, onUpdate }) => {
    const [isEditing, toggleEditing] = useToggle(false);

    return isEditing ? (
        <ProfileEditOverview user={user} onClose={toggleEditing} onUpdate={onUpdate} />
    ) : (
        <ProfileOverview user={user} onEdit={toggleEditing} />
    );
};

export default ProfileContent;
