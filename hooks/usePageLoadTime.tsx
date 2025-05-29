import { useEffect } from 'react';

export const usePageLoadTime = () => {
    useEffect(() => {
        const start = performance.now();

        window.addEventListener('load', () => {
            const end = performance.now();
            console.log(`[Page Load] Time to load: ${(end - start).toFixed(2)} ms`);
        });

        return () => {
            window.removeEventListener('load', () => {});
        };
    }, []);
};
