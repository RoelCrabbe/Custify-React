import { Role } from '@types';

export const getRoleBadgeColor = (role: any) => {
    switch (role) {
        case Role.Admin:
            return 'bg-purple-100 text-purple-800';
        case Role.HumanResources:
            return 'bg-yellow-100 text-yellow-800';
        case Role.Guest:
            return 'bg-indigo-100 text-indigo-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getStatusColor = (status: any) => {
    switch (status) {
        case true:
            return 'bg-green-100 text-green-800';
        case false:
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
