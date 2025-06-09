export const ErrorStatus = {
    New: 'New',
    Reviewed: 'Reviewed ',
    Resolved: 'Resolved',
} as const;

export type ErrorStatus = (typeof ErrorStatus)[keyof typeof ErrorStatus];

export const isValidErrorStatus = (status: unknown): status is ErrorStatus => {
    return typeof status === 'string' && Object.values(ErrorStatus).includes(status as ErrorStatus);
};
