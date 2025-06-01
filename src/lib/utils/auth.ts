import { User } from '@types';

export const getUserRole = (user: User | null): string => {
    return user ? user.role : '';
};
