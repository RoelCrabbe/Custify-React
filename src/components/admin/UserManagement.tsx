import UserManagementTable from '@components/admin/UserManagementTable';
import FormContainer from '@components/ui/FormContainer';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    data: any[];
    isError: boolean;
    isLoading: boolean;
    error: unknown;
    onRetry: () => void;
}

const UserManagement: React.FC<Props> = ({ data, isError, isLoading, error, onRetry }) => {
    return (
        <>
            <FormContainer.Card className="overflow-hidden h-full">
                <FormContainer className="flex flex-col h-full">
                    <header className="user-management-header">
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon icon={faUsers} />
                            <h2>User Management</h2>
                        </div>
                        <p className="text-sm text-gray-600">Manage and monitor user accounts</p>
                    </header>

                    <div className="flex-1 flex flex-col min-h-0">
                        <UserManagementTable
                            data={data}
                            isError={isError}
                            isLoading={isLoading}
                            error={error}
                            onRetry={onRetry}
                        />
                    </div>
                </FormContainer>
            </FormContainer.Card>
        </>
    );
};

export default UserManagement;
