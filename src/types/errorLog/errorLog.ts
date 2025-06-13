import { ErrorHttpMethod, ErrorSeverity, ErrorStatus, ErrorType } from '@types';

export type ErrorLog = {
    id?: number;
    type: ErrorType;
    severity: ErrorSeverity;
    httpMethod: ErrorHttpMethod;
    errorMessage: string;
    stackTrace: string;
    requestPath: string;
    status: ErrorStatus;
    resolvedById?: number;
    resolvedDate?: Date;
};
