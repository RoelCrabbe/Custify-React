import { ErrorSeverity, ErrorType, HttpMethod } from '@types';

export type ErrorLog = {
    id?: number;
    type: ErrorType;
    severity: ErrorSeverity;
    httpMethod: HttpMethod;
    errorMessage: string;
    stackTrace: string;
    requestPath: string;
};
