import { LabelMessage } from '@types';
import { Dispatch, SetStateAction } from 'react';

export const handleErrorLabel = (
    error: unknown,
    setError: Dispatch<SetStateAction<LabelMessage | undefined>>,
    fallbackMessage?: string,
) => {
    if (error instanceof Error) {
        setError({
            label: 'Unexpected Error',
            type: 'error',
            message:
                error.message ||
                fallbackMessage ||
                'An unexpected error occurred. Please try again later.',
        });
    } else if (typeof error === 'string') {
        setError({
            label: 'Unexpected Error',
            type: 'error',
            message:
                error || fallbackMessage || 'An unexpected error occurred. Please try again later.',
        });
    } else {
        setError({
            label: 'Unexpected Error',
            type: 'error',
            message: fallbackMessage || 'An unexpected error occurred. Please try again later.',
        });
    }
};
