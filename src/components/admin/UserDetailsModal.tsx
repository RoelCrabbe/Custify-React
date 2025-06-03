import {
    faCheckCircle,
    faEdit,
    faShieldAlt,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Role, User } from '@types';

interface Props {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onEdit: (user: User) => void;
}

const UserDetailsModal: React.FC<Props> = ({ isOpen, user, onClose, onEdit }) => {
    if (!isOpen || !user) {
        return null;
    }

    const getRoleBadgeColor = (role: Role) => {
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

    const handleEdit = () => {
        onEdit(user);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">User Details</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <FontAwesomeIcon icon={faXmarkCircle} className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-2xl font-medium text-blue-600">
                                    {user.firstName[0]}
                                    {user.lastName[0]}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <p className="mt-1 text-sm text-gray-900">@{user.userName}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {user.phoneNumber || 'Not provided'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getRoleBadgeColor(user.role)}`}>
                                    <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4 mr-1" />
                                    {user.role}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                                        user.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                    {user.isActive ? (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="h-4 w-4 mr-1"
                                            />
                                            Active
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon
                                                icon={faXmarkCircle}
                                                className="h-4 w-4 mr-1"
                                            />
                                            Inactive
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                Close
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <FontAwesomeIcon icon={faEdit} className="h-4 w-4 mr-2 inline" />
                                Edit User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;
