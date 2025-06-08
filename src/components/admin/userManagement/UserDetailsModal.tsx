import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import UserAvatar from '@components/ui/UserAvatar';
import { faEdit, faShieldAlt, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { getRoleColor, getStatusColor, getStatusIcon, User } from '@types';

interface Props {
    user: User;
    onEdit: () => void;
    onClose: () => void;
}

const UserDetailsModal: React.FC<Props> = ({ user, onEdit, onClose }) => {
    return (
        <>
            <FormContainer.Modal>
                <FormContainer.Card className="relative flex flex-col gap-4 mx-auto p-5 w-96">
                    <header className="user-details-header">
                        <h3>User Details</h3>
                        <button type="button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    </header>

                    <div className="flex items-center justify-center">
                        <UserAvatar
                            size={'lg'}
                            firstName={user.firstName}
                            lastName={user.lastName}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 px-2">
                        <section className="flex flex-col text-sm text-gray-600">
                            <label className="font-medium">Full Name</label>
                            <span>
                                {user.firstName} {user.lastName}
                            </span>
                        </section>

                        <section className="flex flex-col text-sm text-gray-600">
                            <label className="font-medium">Username</label>
                            <span>@{user.userName}</span>
                        </section>

                        <section className="flex flex-col text-sm text-gray-600">
                            <label className="font-medium">Email</label>
                            <span>{user.email}</span>
                        </section>

                        <section className="flex flex-col text-sm text-gray-600">
                            <label className="font-medium">Phone Number</label>
                            <span>{user.phoneNumber || 'Not provided'}</span>
                        </section>

                        <section className="flex flex-col text-sm text-gray-600">
                            <label className="font-medium">Role</label>
                            <span
                                className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getRoleColor(user.role)}`}>
                                <FontAwesomeIcon
                                    icon={faShieldAlt}
                                    className="user-management__icon"
                                />
                                {capitalizeFirstLetter(user.role)}
                            </span>
                        </section>

                        <section className="flex flex-col text-sm text-gray-600">
                            <label className="font-medium">Status</label>
                            <span
                                className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(user.status)}`}>
                                <FontAwesomeIcon
                                    icon={getStatusIcon(user.status)}
                                    className="user-management__icon"
                                />
                                {capitalizeFirstLetter(user.status)}
                            </span>
                        </section>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button.Primary onClick={onEdit}>
                            <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                            Edit User
                        </Button.Primary>
                    </div>
                </FormContainer.Card>
            </FormContainer.Modal>
        </>
    );
};

export default UserDetailsModal;
