import React from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
    text?: string;
    size?: number;
}

const TableLoading: React.FC<Props> = ({ text = 'Loading info...', size = 64 }: Props) => {
    return (
        <>
            <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-4 text-gray-600">
                    <ClipLoader size={size} color="#2563eb" />
                    <p className="text-sm">{text}</p>
                </div>
            </div>
        </>
    );
};

export default TableLoading;
