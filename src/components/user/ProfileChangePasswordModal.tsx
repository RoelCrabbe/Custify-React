import Button from '@components/ui/Button';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import ModalContainer from '@components/ui/container/ModalContainer';
import InputField from '@components/ui/InputField';
import StatusMessage from '@components/ui/StatusMessage';
import { faLock, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleErrorLabel } from '@lib';
import { userService } from '@services/index';
import { LabelMessage, User } from '@types';
import { validatePassWord } from '@validators/user';
import { useState } from 'react';
interface Props {
    user: User;
    onClose: () => void;
    onUpdate: (updatedUser: User) => void;
}

const ProfileChangePasswordModal: React.FC<Props> = ({ user, onClose, onUpdate }) => {
    const [currentPassWord, setCurrentPassWord] = useState<string | null>(null);
    const [newPassWord, setNewPassWord] = useState<string | null>(null);
    const [confirmPassWord, setConfirmPassWord] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const validate = (): boolean => {
        if (!currentPassWord?.trim()) {
            setLabelMessage({
                label: 'Current Password Required',
                message: 'Please enter your current password to verify your identity.',
                type: 'error',
            });
            return false;
        }

        const passwordError = validatePassWord(newPassWord);
        if (passwordError) {
            handleErrorLabel(passwordError, setLabelMessage);
            return false;
        }

        if (newPassWord !== confirmPassWord) {
            setLabelMessage({
                label: 'Password Mismatch',
                message: 'New password and confirmation password do not match.',
                type: 'error',
            });
            return false;
        }

        if (currentPassWord === newPassWord) {
            setLabelMessage({
                label: 'Same Password',
                message: 'New password must be different from your current password.',
                type: 'error',
            });
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

        const formData: any = {
            id: user.id,
            currentPassWord,
            newPassWord,
            confirmPassWord,
        };

        try {
            const userResponse = await userService.updatePassWord(formData);
            const userJson = await userResponse.json();

            if (!userResponse.ok) {
                handleErrorLabel(userJson.message, setLabelMessage);
                return;
            }

            setLabelMessage({
                label: 'Successfully updated password!',
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
            label={'Change Password'}
            icon={faLock}
            gap={'4'}
            footer={
                <div className="flex justify-end gap-4">
                    <Button.Primary onClick={handleSubmit} disabled={isButtonDisabled}>
                        <FontAwesomeIcon icon={faSave} className={'h-4 w-4'} />
                        Update Password
                    </Button.Primary>
                </div>
            }>
            <form>
                <Column>
                    <Card
                        className={
                            'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-200 px-6 py-3'
                        }>
                        <p className="text-sm text-yellow-800">
                            <strong>Security Notice:</strong> You must enter your current password
                            to verify your identity before setting a new password.
                        </p>
                    </Card>

                    <Card className={'bg-gradient-to-br from-gray-100 to-gray-200 px-6 pb-6 py-3'}>
                        <Column>
                            <InputField
                                type="password"
                                label="Current Password"
                                value={currentPassWord}
                                onChange={setCurrentPassWord}
                                placeholder="Enter your current password for verification"
                                required
                            />

                            <InputField
                                type="password"
                                label="New Password"
                                value={newPassWord}
                                onChange={setNewPassWord}
                                validate={validatePassWord}
                                placeholder="Enter your new password"
                                required
                            />

                            <InputField
                                type="password"
                                label="Confirm New Password"
                                value={confirmPassWord}
                                onChange={setConfirmPassWord}
                                placeholder="Re-enter your new password"
                                required
                            />

                            {labelMessage && (
                                <section className="mx-auto w-[500px]">
                                    <StatusMessage labelMessage={labelMessage} />
                                </section>
                            )}
                        </Column>
                    </Card>
                </Column>
            </form>
        </ModalContainer>
    );
};

export default ProfileChangePasswordModal;
