import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Centered from '@components/ui/container/Centered';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import Row from '@components/ui/container/Row';
import Label from '@components/ui/content/Label';
import InputField from '@components/ui/InputField';
import StatusMessage from '@components/ui/StatusMessage';
import ProfileChangePasswordModal from '@components/user/ProfileChangePasswordModal';
import ProfileImageUploader from '@components/user/ProfileImageUploader';
import {
    faAddressCard,
    faCamera,
    faIdCard,
    faSave,
    faShieldAlt,
    faTimes,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter, handleErrorLabel } from '@lib';
import { userService } from '@services/index';
import {
    getUserRoleColor,
    getUserStatusColor,
    getUserStatusIcon,
    LabelMessage,
    User,
} from '@types';
import {
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePhoneNumber,
    validateUserName,
} from '@validators/user';
import { useEffect, useState } from 'react';

interface Props {
    user: User;
    onClose: () => void;
    onUpdate: (updatedUser: User) => void;
}

const ProfileEditForm: React.FC<Props> = ({ user, onClose, onUpdate }) => {
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [email, setEmail] = useState<string>(user.email);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(user.phoneNumber || '');
    const [userName, setUserName] = useState<string>(user.userName);
    const [updatePassword, setUpdatePassword] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(user.profileImage?.url || null);

    const handleImageChange = (file: File | null, preview: string | null) => {
        setProfileImage(file);
        setImagePreview(preview);
    };

    const handleImageError = (labelMessage: LabelMessage) => {
        setLabelMessage(labelMessage);
    };

    const handleImageProcessing = (labelMessage: LabelMessage) => {
        setLabelMessage(labelMessage);
    };

    const hasChanges = (): boolean => {
        return (
            firstName !== user.firstName ||
            lastName !== user.lastName ||
            email !== user.email ||
            phoneNumber !== (user.phoneNumber || '') ||
            userName !== user.userName ||
            profileImage !== null
        );
    };

    const validate = (): boolean => {
        const errors = [
            validateFirstName(firstName),
            validateLastName(lastName),
            validateEmail(email),
            validatePhoneNumber(phoneNumber),
            validateUserName(userName),
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
            profileImage: profileImage
                ? {
                      url: imagePreview,
                      altText: `${firstName} ${lastName} Profile Image`,
                      fileName: profileImage.name,
                      fileSize: profileImage.size,
                      mimeType: profileImage.type,
                  }
                : undefined,
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
                message: 'Processing update...',
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

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Column gap={'8'}>
                <Card
                    className={'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative'}>
                    <div className="absolute bottom-6 right-6">
                        <Row>
                            <Button.Ghost
                                onClick={onClose}
                                size={'sm'}
                                className="text-white hover:text-red-100 hover:bg-red-500/20 border-white/20 hover:border-red-300/30 active:bg-red-500/30 active:text-white focus:bg-red-500/10 focus:text-white focus:ring-red-300/20">
                                <Row gap={'2'}>
                                    <FontAwesomeIcon icon={faTimes} />
                                    Cancel
                                </Row>
                            </Button.Ghost>
                            <Button.Ghost
                                size={'sm'}
                                onClick={handleSubmit}
                                disabled={isButtonDisabled}
                                className="text-white hover:text-blue-100 hover:bg-white/10 border-white/20 hover:border-white/30 active:bg-white/20 active:text-white focus:bg-white/10 focus:text-white focus:ring-white/20">
                                <Row gap={'2'}>
                                    <FontAwesomeIcon icon={faSave} />
                                    Save Changes
                                </Row>
                            </Button.Ghost>
                        </Row>
                    </div>

                    <Container
                        easeIn
                        isVisible={isVisible}
                        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                        <Column className={'items-center'}>
                            <ProfileImageUploader
                                user={user}
                                onClearError={() => setLabelMessage(undefined)}
                                onImageChange={handleImageChange}
                                onError={handleImageError}
                                onProcessing={handleImageProcessing}
                            />
                            <Column className={'items-center'}>
                                <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <span className="text-lg text-blue-100">@{user.userName}</span>
                            </Column>
                            <Row>
                                <Badge
                                    size={'md'}
                                    text={capitalizeFirstLetter(user.role)}
                                    icon={faShieldAlt}
                                    color={getUserRoleColor(user.role)}
                                />
                                <Badge
                                    size={'md'}
                                    text={capitalizeFirstLetter(user.status)}
                                    icon={getUserStatusIcon(user.status)}
                                    color={getUserStatusColor(user.status)}
                                />
                            </Row>
                            <section className="w-1/2">
                                {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                            </section>
                        </Column>
                    </Container>
                </Card>

                <Column gap={'8'} className="max-w-7xl mx-auto w-full">
                    <Container
                        easeIn
                        isVisible={isVisible}
                        className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                        <Column gap={'6'} className={'xl:col-span-2'}>
                            <Card className={'bg-gradient-to-br from-gray-100 to-gray-200 p-6'}>
                                <Column>
                                    <Row>
                                        <Centered className={'w-10 h-10 bg-blue-200 rounded-lg'}>
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                className={'w-5 h-5 text-blue-600'}
                                            />
                                        </Centered>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Personal Information
                                        </h3>
                                    </Row>

                                    <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
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

                                        <Container className={'sm:col-span-2'}>
                                            <InputField
                                                type="text"
                                                label={'Username'}
                                                value={userName}
                                                onChange={setUserName}
                                                validate={validateUserName}
                                                placeholder={'Enter your username'}
                                                required
                                            />
                                        </Container>

                                        <Button.Secondary
                                            onClick={() => setUpdatePassword(true)}
                                            size={'md'}>
                                            Update Password
                                        </Button.Secondary>
                                    </Container>
                                </Column>
                            </Card>
                            <Card
                                className={
                                    'bg-gradient-to-br from-green-100 to-emerald-100 p-6 border-green-200'
                                }>
                                <Column>
                                    <Row>
                                        <Centered className={'w-10 h-10 bg-green-200 rounded-lg'}>
                                            <FontAwesomeIcon
                                                icon={faAddressCard}
                                                className={'w-5 h-5 text-green-600'}
                                            />
                                        </Centered>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Contact Information
                                        </h3>
                                    </Row>

                                    <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
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
                                    </Container>
                                </Column>
                            </Card>
                        </Column>

                        <Column gap={'6'}>
                            <Card
                                className={
                                    'bg-gradient-to-br from-purple-100 to-indigo-100 p-6 border-purple-200'
                                }>
                                <Column>
                                    <Row>
                                        <Centered className={'w-10 h-10 bg-purple-200 rounded-lg'}>
                                            <FontAwesomeIcon
                                                icon={faIdCard}
                                                className={'w-5 h-5 text-purple-600'}
                                            />
                                        </Centered>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Account Details
                                        </h3>
                                    </Row>

                                    <Column gap={'2'}>
                                        <Label>Role</Label>
                                        <Badge
                                            size={'md'}
                                            text={capitalizeFirstLetter(user.role)}
                                            icon={faShieldAlt}
                                            color={getUserRoleColor(user.role)}
                                        />
                                    </Column>

                                    <Column gap={'2'}>
                                        <Label>Status</Label>
                                        <Badge
                                            size={'md'}
                                            text={capitalizeFirstLetter(user.status)}
                                            icon={getUserStatusIcon(user.status)}
                                            color={getUserStatusColor(user.status)}
                                        />
                                    </Column>
                                </Column>
                            </Card>
                            <Card
                                className={
                                    'bg-gradient-to-br from-orange-100 to-yellow-100 p-6 border-orange-200'
                                }>
                                <Column>
                                    <Row>
                                        <Centered className={'w-10 h-10 bg-orange-200 rounded-lg'}>
                                            <FontAwesomeIcon
                                                icon={faCamera}
                                                className={'w-5 h-5 text-orange-600'}
                                            />
                                        </Centered>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Profile Photo
                                        </h3>
                                    </Row>

                                    <Column gap={'2'}>
                                        <p className="text-sm text-gray-600">
                                            Hover over your profile photo and click the camera icon
                                            to upload a new image.
                                        </p>
                                        <div className="text-xs text-gray-500 space-y-1">
                                            <div>• Supported formats: JPEG, PNG, WebP</div>
                                            <div>• Maximum size: 5MB</div>
                                            <div>• Recommended: Square images work best</div>
                                        </div>
                                    </Column>
                                </Column>
                            </Card>
                        </Column>
                    </Container>
                </Column>
            </Column>

            {updatePassword && (
                <ProfileChangePasswordModal
                    user={user}
                    onClose={() => setUpdatePassword(false)}
                    onUpdate={onUpdate}
                />
            )}
        </>
    );
};

export default ProfileEditForm;
