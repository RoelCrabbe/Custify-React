import React from 'react';

type Props = {
    message: string;
    onRetry: () => void;
};

const TableError: React.FC<Props> = ({ message, onRetry }: Props) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-96">
                <div className="flex flex-col items-center gap-4 bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-lg shadow-md max-w-md text-center">
                    <strong className="text-lg font-semibold">Error loading data</strong>
                    <p className="text-sm">{message}</p>
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200">
                        Retry
                    </button>
                </div>
            </div>
        </>
    );
};

export default TableError;
