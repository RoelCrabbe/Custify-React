import { ErrorLog } from '@types';

export const updateErrorLogs = (
    prev: ErrorLog[],
    updated: ErrorLog,
    selectedStatus: string,
): ErrorLog[] => {
    const { id, status } = updated;
    const statusChanged = status !== selectedStatus;

    const existing = prev.find((log) => log.id === id);
    if (!existing) return prev;

    return statusChanged
        ? prev.filter((log) => log.id !== id)
        : prev.map((log) => (log.id === id ? updated : log));
};
