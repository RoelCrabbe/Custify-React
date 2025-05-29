import { useRef } from 'react';

export const useRenderLogger = (componentName: string) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    console.log(`[Render] ${componentName} rendered ${renderCount.current} time(s)`);
};
