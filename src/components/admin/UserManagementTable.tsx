import UserDetailsModal from '@components/admin/UserDetailsModal';
import TableError from '@components/table/TableError';
import TableLoading from '@components/table/TableLoading';
import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
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

type Props = {
    data: any[];
    isError: boolean;
    isLoading: boolean;
    error: unknown;
    onRetry: () => void;
};

const UserManagementTable: React.FC<Props> = ({ data, isError, isLoading, error, onRetry }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    if (isLoading) {
        return <TableLoading text="Loading user management info..." />;
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
            <FormContainer hasBorder className="overflow-hidden h-full">
                <FormContainer className="flex flex-col h-full">
                    <div className="admin-user-management-header flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => onRetry()}
                                className="admin-collapse-btn">
                                <FontAwesomeIcon icon={faUsers} className="admin-brand-icon" />
                            </button>
                            <h2 className="admin-brand-title">User Management</h2>
                        </div>
                        <p className="text-sm text-gray-600 pr-2">
                            Manage and monitor user accounts
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="overflow-hidden flex-1 flex flex-col">
                            <div className="flex-shrink-0 bg-gray-50 border-b border-gray-200">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="admin-table-header">User</th>
                                            <th className="admin-table-header">Contact</th>
                                            <th className="admin-table-header">Role</th>
                                            <th className="admin-table-header">Status</th>
                                            <th className="admin-table-header">Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="flex-1 overflow-y-auto bg-white mr-2">
                                <table className="min-w-full">
                                    <tbody className="divide-y divide-gray-200">
                                        {data.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <span className="text-sm font-medium text-blue-600">
                                                                    {user.firstName[0]}
                                                                    {user.lastName[0]}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <section className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {user.firstName} {user.lastName}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                @{user.userName}
                                                            </span>
                                                        </section>
                                                    </div>
                                                </td>

                                                <td className="flex flex-col gap-1 px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 text-sm text-gray-900">
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className="h-4 w-4 text-gray-400"
                                                        />
                                                        {user.email}
                                                    </div>
                                                    {user.phoneNumber && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-900">
                                                            <FontAwesomeIcon
                                                                icon={faPhone}
                                                                className="h-4 w-4 text-gray-400"
                                                            />
                                                            {user.phoneNumber}
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                                        <FontAwesomeIcon
                                                            icon={faShieldAlt}
                                                            className="h-4 w-4"
                                                        />
                                                        {capitalizeFirstLetter(user.role)}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.isActive)}`}>
                                                        {user.isActive ? (
                                                            <>
                                                                <FontAwesomeIcon
                                                                    icon={faCheckCircle}
                                                                    className="h-4 w-4"
                                                                />
                                                                Active
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FontAwesomeIcon
                                                                    icon={faXmarkCircle}
                                                                    className="h-4 w-4"
                                                                />
                                                                Inactive
                                                            </>
                                                        )}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Button
                                                        onClick={() => handleViewDetails(user)}
                                                        className="inline-flex items-center gap-2 w-fit">
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className="h-4 w-4"
                                                        />
                                                        View Details
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
            </FormContainer>

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
