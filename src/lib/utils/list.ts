export const safeSetList = <T>(
    data: unknown,
    setState: React.Dispatch<React.SetStateAction<T[]>>,
) => {
    if (Array.isArray(data)) {
        setState(data as T[]);
    }
};
