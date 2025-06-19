import MainPageLayout from '@components/layout/MainPageLayout';
import ProfileContent from '@components/user/ProfileContent';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { useEntity } from '@hooks/useEntity';
import { User } from '@types';

const UserProfilePage: React.FC = () => {
    const { shouldRender, currentUser } = useRequireAuth();
    const { entity, handleUpdate } = useEntity<User>(currentUser.getValue());

    return (
        <MainPageLayout pageName={'Profile'} isLoading={!shouldRender}>
            {entity && <ProfileContent user={entity} onUpdate={handleUpdate} />}
        </MainPageLayout>
    );
};

export default UserProfilePage;
