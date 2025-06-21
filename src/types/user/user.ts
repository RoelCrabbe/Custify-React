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
    userImage?: UserImage;
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
    currentPassWord: string;
    newPassWord: string;
    confirmPassWord: string;
};
