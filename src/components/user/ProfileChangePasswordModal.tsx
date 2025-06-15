import Button from '@components/ui/Button';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Modal from '@components/ui/container/Modal';
import InputField from '@components/ui/InputField';
import StatusMessage from '@components/ui/StatusMessage';
import { faSave, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
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
    const [currentPassword, setCurrentPassword] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const validate = (): boolean => {
        if (!currentPassword?.trim()) {
            setLabelMessage({
                label: 'Current Password Required',
                message: 'Please enter your current password to verify your identity.',
                type: 'error',
            });
            return false;
        }

        const passwordError = validatePassWord(newPassword);
        if (passwordError) {
            handleErrorLabel(passwordError, setLabelMessage);
            return false;
        }

        if (newPassword !== confirmPassword) {
            setLabelMessage({
                label: 'Password Mismatch',
                message: 'New password and confirmation password do not match.',
                type: 'error',
            });
            return false;
        }

        if (currentPassword === newPassword) {
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
            currentPassword,
            newPassword,
            confirmPassword,
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
        <>
            <Modal className={'z-[60]'}>
                <Card className={'relative mx-auto p-6 w-[800px] max-h-[90vh]'}>
                    <Column gap={'6'}>
                        <header className="user-details-header">
                            <h3>Update Password</h3>
                            <button type="button" onClick={onClose}>
                                <FontAwesomeIcon icon={faXmarkCircle} />
                            </button>
                        </header>

                        <form>
                            <Column>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Security Notice:</strong> You must enter your
                                        current password to verify your identity before setting a
                                        new password.
                                    </p>
                                </div>

                                <InputField
                                    type="password"
                                    label="Current Password"
                                    value={currentPassword}
                                    onChange={setCurrentPassword}
                                    placeholder="Enter your current password for verification"
                                    required
                                />

                                <InputField
                                    type="password"
                                    label="New Password"
                                    value={newPassword}
                                    onChange={setNewPassword}
                                    validate={validatePassWord}
                                    placeholder="Enter your new password"
                                    required
                                />

                                <InputField
                                    type="password"
                                    label="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                    placeholder="Re-enter your new password"
                                    required
                                />
                            </Column>

                            {labelMessage && (
                                <section className="mx-auto w-[500px]">
                                    <StatusMessage labelMessage={labelMessage} />
                                </section>
                            )}
                        </form>

                        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                            <Button.Primary onClick={handleSubmit} disabled={isButtonDisabled}>
                                <FontAwesomeIcon icon={faSave} className={'h-4 w-4'} />
                                Update Password
                            </Button.Primary>
                        </div>
                    </Column>
                </Card>
            </Modal>
        </>
    );
};

export default ProfileChangePasswordModal;
