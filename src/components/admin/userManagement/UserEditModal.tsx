import UserEditModalHeader from '@components/admin/userManagement/UserEditModalHeader';
import Button from '@components/ui/Button';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import ModalContainer from '@components/ui/container/ModalContainer';
import InputField from '@components/ui/InputField';
import InputSelect from '@components/ui/InputSelect';
import StatusMessage from '@components/ui/StatusMessage';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
        <ModalContainer
            onClose={onClose}
            label={'Edit Details'}
            icon={faUser}
            gap={'4'}
            footer={
                <div className="flex justify-end gap-4">
                    <Button.Secondary onClick={onCancel}>Cancel</Button.Secondary>
                    <Button.Submit onClick={handleSubmit} isLoading={isButtonDisabled}>
                        Save Changes
                    </Button.Submit>
                </div>
            }
            className={'w-[960px]'}>
            <form>
                <Column>
                    <UserEditModalHeader user={user} />

                    <Container className="grid grid-cols-3 gap-4">
                        <Column className={'col-span-2'}>
                            <Card
                                className={
                                    'bg-gradient-to-br from-gray-100 to-gray-200 px-6 pb-6 py-3'
                                }>
                                <Column>
                                    <h5 className="text-sm font-semibold text-gray-900">
                                        Personal Information
                                    </h5>

                                    <Container className="grid grid-cols-2 gap-4">
                                        <InputField
                                            type={'text'}
                                            label={'First Name'}
                                            value={firstName}
                                            onChange={setFirstName}
                                            validate={validateFirstName}
                                            placeholder={'Enter your first name'}
                                            required
                                        />

                                        <InputField
                                            type={'text'}
                                            label={'Last Name'}
                                            value={lastName}
                                            onChange={setLastName}
                                            validate={validateLastName}
                                            placeholder={'Enter your last name'}
                                            required
                                        />

                                        <Container className={'col-span-2'}>
                                            <InputField
                                                type={'text'}
                                                label={'Username'}
                                                value={userName}
                                                onChange={setUserName}
                                                validate={validateUserName}
                                                placeholder={'Enter your username'}
                                                required
                                            />
                                        </Container>
                                    </Container>
                                </Column>
                            </Card>

                            <Card
                                className={
                                    'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200 px-6 pb-6 py-3'
                                }>
                                <Column>
                                    <h5 className="text-sm font-semibold text-gray-900">
                                        Contact Information
                                    </h5>

                                    <Container className="grid grid-cols-2 gap-4">
                                        <InputField
                                            type={'email'}
                                            label={'Email'}
                                            value={email}
                                            onChange={setEmail}
                                            validate={validateEmail}
                                            placeholder={'Enter your email'}
                                            required
                                        />

                                        <InputField
                                            type={'tel'}
                                            label={'Phone Number'}
                                            value={phoneNumber}
                                            onChange={setPhoneNumber}
                                            validate={validatePhoneNumber}
                                            placeholder={'Enter your phone number'}
                                        />
                                    </Container>
                                </Column>
                            </Card>
                        </Column>

                        <Column>
                            <Card
                                className={
                                    'bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-200 px-6 pb-6 py-3 h-fit'
                                }>
                                <Column>
                                    <h5 className="text-sm font-semibold text-gray-900">
                                        Account Details
                                    </h5>

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
                                </Column>
                            </Card>

                            {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                        </Column>
                    </Container>
                </Column>
            </form>
        </ModalContainer>
    );
};

export default UserEditModal;
