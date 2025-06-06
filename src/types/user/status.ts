import { faCheckCircle, faTrash, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

export const Status = {
    Active: 'Active',
    InActive: 'Inactive',
    Deleted: 'Deleted',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const isValidStatus = (status: unknown): status is Status => {
    return typeof status === 'string' && Object.values(Status).includes(status as Status);
};

export const isActiveStatus = (status: Status): boolean => {
    return status === Status.Active;
};

export const isInactiveStatus = (status: Status): boolean => {
    return status === Status.InActive;
};

export const isDeletedStatus = (status: Status): boolean => {
    return status === Status.Deleted;
};

export const isUserAccessible = (status: Status): boolean => {
    return status !== Status.Deleted;
};

export const getStatusColor = (status: Status) => {
    switch (status) {
        case Status.Active:
            return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case Status.InActive:
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case Status.Deleted:
            return 'bg-pink-100 text-pink-800 border-pink-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getStatusIcon = (status: Status) => {
    switch (status) {
        case Status.Active:
            return faCheckCircle;
        case Status.InActive:
            return faXmarkCircle;
        case Status.Deleted:
            return faTrash;
        default:
            return faXmarkCircle;
    }
};
