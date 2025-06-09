import { UserRole, UserStatus } from '@types';

export type User = {
    id?: number;
    role: UserRole;
    status: UserStatus;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
};
