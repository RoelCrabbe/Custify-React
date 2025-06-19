import { useCallback, useState } from 'react';

export const useToggle = (
    initialValue: boolean = false,
): [boolean, () => void, (value: boolean) => void] => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    const setToggle = useCallback((newValue: boolean) => {
        setValue(newValue);
    }, []);

    return [value, toggle, setToggle];
};
