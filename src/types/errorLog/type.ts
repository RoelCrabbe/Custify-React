import { faBug, faExclamationTriangle, faKey, faSearch } from '@fortawesome/free-solid-svg-icons';

export const ErrorType = {
    NotFoundError: 'Not Found',
    ValidationError: 'Validation Error',
    AuthenticationError: 'Authentication Error',
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

export const isValidErrorType = (type: unknown): type is ErrorType => {
    return typeof type === 'string' && Object.values(ErrorType).includes(type as ErrorType);
};

export const getErrorTypeColor = (type: ErrorType): string => {
    switch (type) {
        case ErrorType.NotFoundError:
            return 'bg-orange-100 text-orange-800';
        case ErrorType.ValidationError:
            return 'bg-rose-100 text-rose-800';
        case ErrorType.AuthenticationError:
            return 'bg-indigo-100 text-indigo-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getErrorTypeIcon = (type: ErrorType) => {
    switch (type) {
        case ErrorType.NotFoundError:
            return faSearch;
        case ErrorType.ValidationError:
            return faExclamationTriangle;
        case ErrorType.AuthenticationError:
            return faKey;
        default:
            return faBug;
    }
};
