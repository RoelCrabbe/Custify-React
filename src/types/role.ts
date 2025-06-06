import { User } from '@types';

export const Role = {
    Admin: 'Admin',
    HumanResources: 'Human Resources',
    Guest: 'Guest',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const isValidRole = (role: unknown): role is Role => {
    return typeof role === 'string' && Object.values(Role).includes(role as Role);
};

export const getUserRole = (user: User | null): string => {
    return user ? user.role : '';
};
