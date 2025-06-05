import UserDetailsModal from '@components/admin/UserDetailsModal';
import TableError from '@components/table/TableError';
import TableLoading from '@components/table/TableLoading';
import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import UserAvatar from '@components/ui/UserAvatar';
import {
    faCheckCircle,
    faEnvelope,
    faEye,
    faPhone,
    faShieldAlt,
    faUsers,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { Role, User } from '@types';
import { useState } from 'react';

interface Props {
    data: any[];
    isError: boolean;
    isLoading: boolean;
    error: unknown;
    onRetry: () => void;
}

const UserManagementTable: React.FC<Props> = ({ data, isError, isLoading, error, onRetry }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    if (isLoading) {
        return <TableLoading text={'Loading user management info...'} />;
    }

    if (isError) {
        return (
            <TableError
                message={error instanceof Error ? error.message : 'Unknown error'}
                onRetry={onRetry}
            />
        );
    }

    const handleViewDetails = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleEditUser = (user: User) => {
        console.log('Edit user:', user);
    };

    const getRoleBadgeColor = (role: any) => {
        switch (role) {
            case Role.ADMIN:
                return 'bg-purple-100 text-purple-800';
            case Role.HR:
                return 'bg-yellow-100 text-yellow-800';
            case Role.USER:
                return 'bg-indigo-100 text-indigo-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: any) => {
        switch (status) {
            case true:
                return 'bg-green-100 text-green-800';
            case false:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

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
                        <div className="overflow-hidden flex-1 flex flex-col">
                            <div className="flex-shrink-0 bg-gray-50 border-b border-gray-200">
                                <table className="user-management-table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Contact</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="flex-1 overflow-y-auto bg-white mr-2">
                                <table className="user-management-table">
                                    <tbody className="divide-y divide-gray-200">
                                        {data.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-100 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-4">
                                                        <UserAvatar
                                                            firstName={user.firstName}
                                                            lastName={user.lastName}
                                                        />

                                                        <section className="flex flex-col gap-1 text-sm text-gray-600">
                                                            <span className="font-medium text-gray-900">
                                                                {user.firstName} {user.lastName}
                                                            </span>
                                                            <span>@{user.userName}</span>
                                                        </section>
                                                    </div>
                                                </td>

                                                <td className="flex flex-col gap-1 px-6 py-4 whitespace-nowrap">
                                                    <section className="flex items-center gap-2 text-sm text-gray-600">
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className="user-management__icon"
                                                        />
                                                        <span>{user.email}</span>
                                                    </section>
                                                    {user.phoneNumber && (
                                                        <section className="flex items-center gap-2 text-sm text-gray-600">
                                                            <FontAwesomeIcon
                                                                icon={faPhone}
                                                                className="user-management__icon"
                                                            />
                                                            <span>{user.phoneNumber}</span>
                                                        </section>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                                        <FontAwesomeIcon
                                                            icon={faShieldAlt}
                                                            className="management__icon"
                                                        />
                                                        <span>
                                                            {capitalizeFirstLetter(user.role)}
                                                        </span>
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.isActive)}`}>
                                                        {user.isActive ? (
                                                            <>
                                                                <FontAwesomeIcon
                                                                    icon={faCheckCircle}
                                                                    className="management__icon"
                                                                />
                                                                <span>Active</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FontAwesomeIcon
                                                                    icon={faXmarkCircle}
                                                                    className="management__icon"
                                                                />
                                                                <span>Inactive</span>
                                                            </>
                                                        )}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Button
                                                        onClick={() => handleViewDetails(user)}
                                                        className="inline-flex items-center gap-2 w-fit">
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className="management__icon"
                                                        />
                                                        <span>View Details</span>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </FormContainer>
            </FormContainer.Card>

            <UserDetailsModal
                isOpen={showModal}
                user={selectedUser}
                onClose={handleCloseModal}
                onEdit={handleEditUser}
            />
        </>
    );
};

export default UserManagementTable;
