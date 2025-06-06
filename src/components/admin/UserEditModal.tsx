import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import InputField from '@components/ui/InputField';
import InputSelect from '@components/ui/InputSelect';
import StatusMessage from '@components/ui/StatusMessage';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleErrorLabel } from '@lib';
import { userService } from '@services/index';
import { LabelMessage, Role, User } from '@types';
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
    const [isActive, setIsActive] = useState<boolean | null>(user.isActive);
    const [role, setRole] = useState<Role | null>(user.role);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const validateFirstName = (name: string | null) => {
        if (!name?.trim()) return 'First name is required.';
        return null;
    };

    const validateLastName = (name: string | null) => {
        if (!name?.trim()) return 'Last name is required.';
        return null;
    };

    const validateEmail = (email: string | null) => {
        if (!email?.trim()) return 'Email is required.';
        return null;
    };

    const validatePhoneNumber = (phoneNumber: string | null) => {
        if (phoneNumber && !phoneNumber?.trim()) return 'Phone number is required.';
        return null;
    };

    const validateUserName = (userName: string | null) => {
        if (!userName?.trim()) return 'Username is required.';
        return null;
    };

    const validateIsActive = (isActive: boolean | null) => {
        if (!isActive) return 'Status is required.';
        return null;
    };

    const validateRole = (role: Role | null) => {
        if (!role?.trim()) return 'Role is required.';
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        const firstNameError = validateFirstName(firstName);
        const lastNameError = validateLastName(lastName);
        const emailError = validateEmail(email);
        const phoneError = validatePhoneNumber(phoneNumber);
        const userNameError = validateUserName(userName);

        if (firstNameError || lastNameError || emailError || phoneError || userNameError) {
            handleErrorLabel(
                firstNameError || lastNameError || emailError || phoneError || userNameError,
                setLabelMessage,
            );
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLabelMessage(undefined);

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 2000);

        if (!validate()) {
            return;
        }

        const formData: any = {
            id: user.id,
            firstName,
            lastName,
            email,
            phoneNumber,
            userName,
            isActive,
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked, type } = e.target;
        if (type === 'checkbox' && name === 'isActive') {
            setIsActive(checked);
        }
    };

    return (
        <>
            <FormContainer.Modal className="z-[60]">
                <FormContainer.Card className="relative flex flex-col gap-4 mx-auto p-5 w-96 max-h-[80vh] overflow-y-auto">
                    <header className="user-details-header">
                        <h3>Edit User</h3>
                        <button type="button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    </header>

                    <form className="grid grid-cols-1 gap-4 px-2">
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
                            required
                        />

                        <InputField
                            type="text"
                            label={'Username'}
                            value={userName}
                            onChange={setUserName}
                            validate={validateUserName}
                            placeholder={'Enter your username'}
                            required
                        />

                        <InputSelect<Role>
                            label="Role"
                            value={role}
                            onChange={setRole}
                            validate={validateRole}
                            enumObject={Role}
                            placeholder="Select a role"
                            required
                        />

                        <section className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                checked={isActive ?? false}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="isActive" className="font-medium text-gray-700">
                                Active User
                            </label>
                        </section>

                        {labelMessage && <StatusMessage labelMessage={labelMessage} />}

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Button.Secondary onClick={onCancel}>Cancel</Button.Secondary>
                            <Button.Submit
                                onClick={handleSubmit}
                                isLoading={isButtonDisabled}
                                size={'lg'}>
                                Save Changes
                            </Button.Submit>
                        </div>
                    </form>
                </FormContainer.Card>
            </FormContainer.Modal>
        </>
    );
};

export default UserEditModal;
