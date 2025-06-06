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

export const getRoleColor = (role: Role) => {
    switch (role) {
        case Role.Admin:
            return 'bg-orange-100 text-orange-800 border-orange-200';
        case Role.HumanResources:
            return 'bg-cyan-100 text-cyan-800 border-cyan-200';
        case Role.Guest:
            return 'bg-violet-100 text-violet-800 border-violet-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};
