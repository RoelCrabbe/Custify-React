import Button from '@components/ui/Button';
import Column from '@components/ui/container/Column';
import React from 'react';

interface Props {
    message: string;
    onRetry: () => void;
}

const TableError: React.FC<Props> = ({ message, onRetry }: Props) => {
    return (
        <Column gap={'0'} className="items-center justify-center h-96">
            <Column
                className={
                    'items-center bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-lg shadow-md max-w-md text-center'
                }>
                <strong className="text-lg font-semibold">Error loading data</strong>
                <p className="text-sm">{message}</p>
                <Button.Primary onClick={onRetry}>Retry</Button.Primary>
            </Column>
        </Column>
    );
};

export default TableError;
