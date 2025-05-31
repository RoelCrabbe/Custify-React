export enum Role {
    ADMIN = 'ADMIN',
    HR = 'HR',
    USER = 'USER',
}

export type User = {
    id?: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    isActive: boolean;
    role: Role;
};

export type LabelMessage = {
    label: string;
    message: string;
    type: 'error' | 'success';
};

export type IdName = {
    id?: number;
    name: string;
};

export type CssOptionType = {
    value: number;
    label: string;
};
