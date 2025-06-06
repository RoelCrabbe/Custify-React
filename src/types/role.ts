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

export const getUserRole = (user: User | null): Role | null => {
    return user?.role && isValidRole(user.role) ? user.role : null;
};

export const isUserRole = (user: User | null, role: Role): boolean => {
    return getUserRole(user) === role;
};

export const isAdmin = (user: User | null): boolean => {
    return isUserRole(user, Role.Admin);
};

export const isHumanResources = (user: User | null): boolean => {
    return isUserRole(user, Role.HumanResources);
};

export const isGuest = (user: User | null): boolean => {
    return isUserRole(user, Role.Guest);
};
