import { ErrorLabelMessage } from '@types';
import { Dispatch, SetStateAction } from 'react';

export const handleErrorLabel = (
    error: unknown,
    setError: Dispatch<SetStateAction<ErrorLabelMessage | undefined>>,
    fallbackMessage?: string,
) => {
    if (error instanceof Error) {
        setError({
            label: 'Unexpected Error',
            message:
                error.message ||
                fallbackMessage ||
                'An unexpected error occurred. Please try again later.',
        });
    } else if (typeof error === 'string') {
        setError({
            label: 'Unexpected Error',
            message:
                error || fallbackMessage || 'An unexpected error occurred. Please try again later.',
        });
    } else {
        setError({
            label: 'Unexpected Error',
            message: fallbackMessage || 'An unexpected error occurred. Please try again later.',
        });
    }
};
