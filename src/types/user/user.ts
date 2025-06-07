import { Role, Status } from '@types';

export type User = {
    id?: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    status: Status;
    phoneNumber?: string;
};
