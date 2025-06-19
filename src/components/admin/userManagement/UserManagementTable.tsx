import UserDetailsModal from '@components/admin/userManagement/UserDetailsModal';
import UserEditModal from '@components/admin/userManagement/UserEditModal';
import TableError from '@components/table/TableError';
import TableLoading from '@components/table/TableLoading';
import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Column from '@components/ui/container/Column';
import UserAvatar from '@components/ui/UserAvatar';
import {
    faArrowsUpDown,
    faEnvelope,
    faEye,
    faPhone,
    faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { getUserRoleColor, getUserStatusColor, getUserStatusIcon, User } from '@types';
import { useState } from 'react';

interface Props {
    users: User[];
    isError: boolean;
    isLoading: boolean;
    onRetry: () => void;
    onUpdate: (updatedUser: User) => void;
}

const UserManagementTable: React.FC<Props> = ({ users, isError, isLoading, onRetry, onUpdate }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    if (isLoading) {
        return <TableLoading text={'Loading user management info...'} />;
    }

    if (isError) {
        return (
            <TableError
                message={'There was an issue getting user management info.'}
                onRetry={onRetry}
            />
        );
    }

    const handleViewDetails = (user: User) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const handleOpenEditModal = () => {
        setShowDetailsModal(false);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setShowDetailsModal(true);
    };

    const handleCloseAllModal = () => {
        setShowDetailsModal(false);
        setShowEditModal(false);
        setSelectedUser(null);
    };

    return (
        <>
            <div className="flex-1 overflow-auto bg-white hide-scrollbar">
                <table className="user-management-table w-full table-fixed">
                    <thead className="sticky top-0 bg-gray-50 z-10">
                        <tr>
                            <th>User</th>
                            <th>Contact</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="flex items-center justify-between">
                                Actions
                                <span>
                                    <FontAwesomeIcon
                                        icon={faArrowsUpDown}
                                        className={'text-gray-400'}
                                    />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-100 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-4">
                                        <UserAvatar user={user} size={'sm'} />
                                        <Column gap={'2'} className={'text-sm text-gray-600'}>
                                            <span className="font-medium text-gray-900">
                                                {user.firstName} {user.lastName}
                                            </span>
                                            <span>@{user.userName}</span>
                                        </Column>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Column gap={'2'}>
                                        <section className="flex items-center gap-2 text-sm text-gray-600">
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                                className={'user-management__icon text-gray-400'}
                                            />
                                            <span>{user.email}</span>
                                        </section>
                                        {user.phoneNumber && (
                                            <section className="flex items-center gap-2 text-sm text-gray-600">
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                    className={
                                                        'user-management__icon text-gray-400'
                                                    }
                                                />
                                                <span>{user.phoneNumber}</span>
                                            </section>
                                        )}
                                    </Column>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge
                                        size={'sm'}
                                        text={capitalizeFirstLetter(user.role)}
                                        icon={faShieldAlt}
                                        color={getUserRoleColor(user.role)}
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge
                                        size={'sm'}
                                        text={capitalizeFirstLetter(user.status)}
                                        icon={getUserStatusIcon(user.status)}
                                        color={getUserStatusColor(user.status)}
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Button.Primary onClick={() => handleViewDetails(user)}>
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            className={'user-management__icon'}
                                        />
                                        <span>View Details</span>
                                    </Button.Primary>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <>
                    {showDetailsModal && (
                        <UserDetailsModal
                            user={selectedUser}
                            onClose={handleCloseAllModal}
                            onEdit={handleOpenEditModal}
                        />
                    )}

                    {showEditModal && (
                        <UserEditModal
                            user={selectedUser}
                            onCancel={handleCloseEditModal}
                            onClose={handleCloseAllModal}
                            onUpdate={onUpdate}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default UserManagementTable;
