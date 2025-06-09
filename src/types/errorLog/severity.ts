import {
    faBug,
    faCheckCircle,
    faExclamationTriangle,
    faServer,
    faShieldAlt,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

export const ErrorSeverity = {
    Handled: 'Handled',
    Unhandled: 'Unhandled',
    InputError: 'Input Error',
    SystemError: 'System Error',
    SecurityError: 'Security Error',
} as const;

export type ErrorSeverity = (typeof ErrorSeverity)[keyof typeof ErrorSeverity];

export const isValidErrorSeverity = (severity: unknown): severity is ErrorSeverity => {
    return (
        typeof severity === 'string' &&
        Object.values(ErrorSeverity).includes(severity as ErrorSeverity)
    );
};

export const getErrorSeverityColor = (type: ErrorSeverity): string => {
    switch (type) {
        case ErrorSeverity.Handled:
            return 'bg-emerald-100 text-emerald-800';
        case ErrorSeverity.Unhandled:
            return 'bg-red-200 text-red-900';
        case ErrorSeverity.InputError:
            return 'bg-yellow-200 text-yellow-900';
        case ErrorSeverity.SystemError:
            return 'bg-blue-200 text-blue-900';
        case ErrorSeverity.SecurityError:
            return 'bg-purple-200 text-purple-900';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getErrorSeverityIcon = (type: ErrorSeverity) => {
    switch (type) {
        case ErrorSeverity.Handled:
            return faCheckCircle;
        case ErrorSeverity.Unhandled:
            return faTimesCircle;
        case ErrorSeverity.InputError:
            return faExclamationTriangle;
        case ErrorSeverity.SystemError:
            return faServer;
        case ErrorSeverity.SecurityError:
            return faShieldAlt;
        default:
            return faBug;
    }
};
