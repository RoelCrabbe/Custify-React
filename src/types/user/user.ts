import { UserRole, UserStatus } from '@types';

export type User = {
    id?: number;
    role: UserRole;
    status: UserStatus;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    passWord: string;
    phoneNumber?: string;
    profileImage?: UserImage;
};

export type UserImage = {
    id?: number;
    url: string;
    altText: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
};

export type UpdatePassWord = {
    id?: number;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
