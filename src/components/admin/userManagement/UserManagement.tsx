import UserManagementTable from '@components/admin/userManagement/UserManagementTable';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@types';

interface Props {
    users: User[];
    isError: boolean;
    isLoading: boolean;
    onRetry: () => void;
    onUpdate: (updatedUser: User) => void;
}

const UserManagement: React.FC<Props> = ({ users, isError, isLoading, onRetry, onUpdate }) => {
    return (
        <Card className={'overflow-hidden h-full'}>
            <Column gap={'0'} className={'h-full'}>
                <header className="user-management-header">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faUsers} />
                        <h2>User Management</h2>
                    </div>
                    <p className="text-sm text-gray-600">Manage and monitor user accounts</p>
                </header>

                <div className="flex-1 flex flex-col min-h-0">
                    <UserManagementTable
                        users={users}
                        isError={isError}
                        isLoading={isLoading}
                        onRetry={onRetry}
                        onUpdate={onUpdate}
                    />
                </div>
            </Column>
        </Card>
    );
};

export default UserManagement;
