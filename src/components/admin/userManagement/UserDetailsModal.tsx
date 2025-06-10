import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import UserAvatar from '@components/ui/UserAvatar';
import { faEdit, faShieldAlt, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { userService } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { getUserRoleColor, getUserStatusColor, getUserStatusIcon, User } from '@types';

interface PropsBase {
    onEdit?: () => void;
    onClose: () => void;
}

interface PropsWithUser extends PropsBase {
    user: User;
    userId?: never;
}

interface PropsWithUserId extends PropsBase {
    userId: number;
    user?: never;
}

type Props = PropsWithUser | PropsWithUserId;

const UserDetailsModal: React.FC<Props> = ({ user, userId, onEdit, onClose }) => {
    const shouldFetch = !user && typeof userId === 'number';

    const {
        data: fetchedUser,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['user-by-id', userId],
        enabled: shouldFetch,
        staleTime: 10 * 60 * 1000,
        queryFn: async () => {
            const response = await userService.getUserById(userId as number);
            if (!response.ok) throw new Error(`User with id ${userId} not found`);
            return (await response.json()) as User;
        },
    });

    const resolvedUser = user ?? fetchedUser;

    if (isLoading && shouldFetch) {
        return (
            <FormContainer.Modal>
                <FormContainer.Card className="relative flex flex-col gap-6 mx-auto p-6 w-[600px] max-h-[90vh]">
                    <header className="user-details-header">
                        <h3>User Details</h3>
                        <button type="button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    </header>

                    <span className="text-center text-gray-500 text-sm">Loading user data...</span>
                </FormContainer.Card>
            </FormContainer.Modal>
        );
    }

    if (isError || !resolvedUser) {
        return (
            <FormContainer.Modal>
                <FormContainer.Card className="relative flex flex-col gap-6 mx-auto p-6 w-[600px] max-h-[90vh]">
                    <header className="user-details-header">
                        <h3>User Details</h3>
                        <button type="button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    </header>

                    <span className="text-center text-red-500 text-sm">
                        Failed to load user data. Please try again.
                    </span>
                </FormContainer.Card>
            </FormContainer.Modal>
        );
    }

    return (
        <>
            <FormContainer.Modal>
                <FormContainer.Card className="relative flex flex-col gap-6 mx-auto p-6 w-[600px] max-h-[90vh]">
                    <header className="user-details-header">
                        <h3>User Details</h3>
                        <button type="button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    </header>

                    <div className="flex flex-col items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        <UserAvatar
                            size={'lg'}
                            firstName={resolvedUser.firstName}
                            lastName={resolvedUser.lastName}
                        />
                        <div className="text-center">
                            <h4 className="text-lg font-semibold text-gray-900">
                                {resolvedUser.firstName} {resolvedUser.lastName}
                            </h4>
                            <p className="text-sm text-gray-600">@{resolvedUser.userName}</p>
                        </div>
                    </div>

                    <FormContainer.Column>
                        <h5 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                            Contact Information
                        </h5>

                        <section className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Email
                            </label>
                            <span className="text-sm text-gray-800">{resolvedUser.email}</span>
                        </section>

                        <section className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Phone Number
                            </label>
                            <span className="text-sm text-gray-800">
                                {resolvedUser.phoneNumber || 'Not provided'}
                            </span>
                        </section>
                    </FormContainer.Column>

                    <FormContainer.Column>
                        <h5 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                            Account Information
                        </h5>

                        <div className="grid grid-cols-2 gap-4">
                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Role
                                </label>
                                <span
                                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getUserRoleColor(resolvedUser.role)}`}>
                                    <FontAwesomeIcon
                                        icon={faShieldAlt}
                                        className="user-management__icon"
                                    />
                                    {capitalizeFirstLetter(resolvedUser.role)}
                                </span>
                            </section>

                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Status
                                </label>
                                <span
                                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getUserStatusColor(resolvedUser.status)}`}>
                                    <FontAwesomeIcon
                                        icon={getUserStatusIcon(resolvedUser.status)}
                                        className="user-management__icon"
                                    />
                                    {capitalizeFirstLetter(resolvedUser.status)}
                                </span>
                            </section>
                        </div>
                    </FormContainer.Column>

                    {onEdit && (
                        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                            <Button.Primary onClick={onEdit}>
                                <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                                Edit User
                            </Button.Primary>
                        </div>
                    )}
                </FormContainer.Card>
            </FormContainer.Modal>
        </>
    );
};

export default UserDetailsModal;
