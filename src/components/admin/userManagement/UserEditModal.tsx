import Button from '@components/ui/Button';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Modal from '@components/ui/container/Modal';
import InputField from '@components/ui/InputField';
import InputSelect from '@components/ui/InputSelect';
import StatusMessage from '@components/ui/StatusMessage';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleErrorLabel } from '@lib';
import { userService } from '@services/index';
import { LabelMessage, User, UserRole, UserStatus } from '@types';
import {
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePhoneNumber,
    validateRole,
    validateStatus,
    validateUserName,
} from '@validators/user';
import { useState } from 'react';
interface Props {
    user: User;
    onCancel: () => void;
    onClose: () => void;
    onUpdate: (updatedUser: User) => void;
}

const UserEditModal: React.FC<Props> = ({ user, onCancel, onClose, onUpdate }) => {
    const [firstName, setFirstName] = useState<string | null>(user.firstName);
    const [lastName, setLastName] = useState<string | null>(user.lastName);
    const [email, setEmail] = useState<string | null>(user.email);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(user.phoneNumber || '');
    const [userName, setUserName] = useState<string | null>(user.userName);
    const [role, setRole] = useState<UserRole | null>(user.role);
    const [status, setStatus] = useState<UserStatus | null>(user.status);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const hasChanges = (): boolean => {
        return (
            firstName !== user.firstName ||
            lastName !== user.lastName ||
            email !== user.email ||
            phoneNumber !== (user.phoneNumber || '') ||
            userName !== user.userName ||
            role !== user.role ||
            status !== user.status
        );
    };

    const validate = (): boolean => {
        const errors = [
            validateFirstName(firstName),
            validateLastName(lastName),
            validateEmail(email),
            validatePhoneNumber(phoneNumber),
            validateUserName(userName),
            validateRole(role),
        ].filter(Boolean);

        if (errors.length > 0) {
            handleErrorLabel(errors[0], setLabelMessage);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLabelMessage(undefined);

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 2000);

        if (!validate()) {
            return;
        }

        if (!hasChanges()) {
            setLabelMessage({
                label: 'No changes detected',
                message: 'No updates were made.',
                type: 'info',
            });
            return;
        }

        const formData: any = {
            id: user.id,
            firstName,
            lastName,
            email,
            phoneNumber,
            userName,
            status,
            role,
        };

        try {
            const userResponse = await userService.updateUser(formData);
            const userJson = await userResponse.json();

            if (!userResponse.ok) {
                handleErrorLabel(userJson.message, setLabelMessage);
                return;
            }

            setLabelMessage({
                label: 'Updated User Successfully!',
                message: 'Closing the form...',
                type: 'success',
            });

            setTimeout(() => {
                onUpdate(userJson);
                onClose();
            }, 2000);
        } catch (error) {
            handleErrorLabel(error, setLabelMessage);
        }
    };

    return (
        <>
            <Modal className={'z-[60]'}>
                <Card className={'relative mx-auto p-6 w-[800px] max-h-[90vh]'}>
                    <Column gap={'6'}>
                        <header className="user-details-header">
                            <h3>Edit User</h3>
                            <button type="button" onClick={onClose}>
                                <FontAwesomeIcon icon={faXmarkCircle} />
                            </button>
                        </header>

                        <form className="flex flex-col gap-6">
                            <Column>
                                <h5 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Personal Information
                                </h5>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        type="text"
                                        label="First Name"
                                        value={firstName}
                                        onChange={setFirstName}
                                        validate={validateFirstName}
                                        placeholder={'Enter your first name'}
                                        required
                                    />

                                    <InputField
                                        type="text"
                                        label="Last Name"
                                        value={lastName}
                                        onChange={setLastName}
                                        validate={validateLastName}
                                        placeholder={'Enter your last name'}
                                        required
                                    />
                                </div>

                                <InputField
                                    type="text"
                                    label={'Username'}
                                    value={userName}
                                    onChange={setUserName}
                                    validate={validateUserName}
                                    placeholder={'Enter your username'}
                                    required
                                />
                            </Column>

                            <Column>
                                <h5 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Contact Information
                                </h5>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        type="email"
                                        label="Email"
                                        value={email}
                                        onChange={setEmail}
                                        validate={validateEmail}
                                        placeholder={'Enter your email'}
                                        required
                                    />
                                    <InputField
                                        type="tel"
                                        label="Phone Number"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber}
                                        validate={validatePhoneNumber}
                                        placeholder={'Enter your phone number'}
                                    />
                                </div>
                            </Column>

                            <Column>
                                <h5 className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Account Settings
                                </h5>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputSelect<UserRole>
                                        label="Role"
                                        value={role}
                                        onChange={setRole}
                                        validate={validateRole}
                                        enumObject={UserRole}
                                        placeholder="Select a role"
                                        required
                                    />

                                    <InputSelect<UserStatus>
                                        label="Status"
                                        value={status}
                                        onChange={setStatus}
                                        validate={validateStatus}
                                        enumObject={UserStatus}
                                        placeholder="Select a status"
                                        required
                                    />
                                </div>
                            </Column>

                            {labelMessage && (
                                <section className="mx-auto w-[500px]">
                                    <StatusMessage labelMessage={labelMessage} />
                                </section>
                            )}
                        </form>

                        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                            <Button.Secondary onClick={onCancel}>Cancel</Button.Secondary>
                            <Button.Submit onClick={handleSubmit} isLoading={isButtonDisabled}>
                                Save Changes
                            </Button.Submit>
                        </div>
                    </Column>
                </Card>
            </Modal>
        </>
    );
};

export default UserEditModal;
