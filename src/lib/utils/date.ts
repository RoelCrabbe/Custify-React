export const formatDateOnly = (date?: Date | null) =>
    date ? new Date(date).toLocaleDateString() : 'N/A';
