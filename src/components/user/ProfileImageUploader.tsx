import UserAvatar from '@components/ui/UserAvatar';
import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compressImageUntilSize } from '@lib';
import { LabelMessage, User } from '@types';
import { useRef, useState } from 'react';

interface Props {
    user: User;
    onImageChange: (file: File | null, preview: string | null) => void;
    onError: (labelMessage: LabelMessage) => void;
    onProcessing: (labelMessage: LabelMessage) => void;
    onClearError: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const ProfileImageUploader: React.FC<Props> = ({
    user,
    onImageChange,
    onError,
    onProcessing,
    onClearError,
    className = '',
    size = 'xxl',
}) => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(user.profileImage?.url || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'h-16 w-16';
            case 'md':
                return 'h-24 w-24';
            case 'lg':
                return 'h-32 w-32';
            case 'xl':
                return 'h-36 w-36';
            case 'xxl':
            default:
                return 'h-40 w-40';
        }
    };

    const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            onError({
                label: 'Invalid file type',
                message: 'Please select a JPEG, PNG, or WebP image.',
                type: 'error',
            });
            return;
        }

        onProcessing({
            label: 'Processing image...',
            message: 'Compressing and preparing your image.',
            type: 'info',
        });

        try {
            const MAX_IMAGE_SIZE = 256 * 1024;
            const compressed = await compressImageUntilSize(file, MAX_IMAGE_SIZE, [
                { maxWidth: 1080, quality: 1 },
                { maxWidth: 810, quality: 0.8 },
                { maxWidth: 540, quality: 0.6 },
            ]);

            if (!compressed || compressed.size > MAX_IMAGE_SIZE) {
                onError({
                    label: 'Compressed image too large',
                    message:
                        'Even after compression, the image exceeds 256 KB. Please choose a smaller image.',
                    type: 'error',
                });
                return;
            }

            setProfileImage(compressed);

            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = e.target?.result as string;
                setImagePreview(preview);
                onImageChange(compressed, preview);

                setTimeout(() => {
                    onClearError();
                }, 1500);
            };
            reader.readAsDataURL(compressed);
        } catch (error) {
            console.error('Error processing image:', error);
            onError({
                label: 'Error processing image',
                message: 'Please try selecting a different image.',
                type: 'error',
            });
        }
    };

    const handleImageRemove = () => {
        setProfileImage(null);
        const originalPreview = user.profileImage?.url || null;
        setImagePreview(originalPreview);
        onImageChange(null, originalPreview);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`relative group ${className}`}>
            {imagePreview ? (
                <div className="relative">
                    <img
                        src={imagePreview}
                        alt={`${user.firstName} ${user.lastName} Profile Image`}
                        className={`${getSizeClasses()} rounded-full object-cover border-4 border-white shadow-lg`}
                    />
                    <button
                        type="button"
                        onClick={handleImageClick}
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Change profile image">
                        <FontAwesomeIcon icon={faCamera} className="text-white text-3xl" />
                    </button>
                    {profileImage && (
                        <button
                            type="button"
                            onClick={handleImageRemove}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-md"
                            title="Remove uploaded image">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                </div>
            ) : (
                <div className="relative">
                    <UserAvatar user={user} size={size} />
                    <button
                        type="button"
                        onClick={handleImageClick}
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Upload profile image">
                        <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
                    </button>
                </div>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageSelect}
                className="hidden"
                aria-label="Upload profile image"
            />
        </div>
    );
};

export default ProfileImageUploader;
