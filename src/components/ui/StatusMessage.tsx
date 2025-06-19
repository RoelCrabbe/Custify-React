import { LabelMessage } from '@types';
import React, { memo } from 'react';

interface Props {
    labelMessage: LabelMessage;
}

const StatusMessage: React.FC<Props> = ({ labelMessage }: Props) => {
    const getBaseClasses = () => 'border-2 rounded-lg p-4 text-center';

    const getTypeClasses = () => {
        switch (labelMessage.type) {
            case 'error':
                return 'bg-red-100 border-red-500';
            case 'success':
                return 'bg-green-100 border-green-500';
            case 'info':
                return 'bg-blue-100 border-blue-500';
            default:
                return 'bg-red-100 border-red-500';
        }
    };

    const getLabelColorClass = () => {
        switch (labelMessage.type) {
            case 'error':
                return 'text-red-700';
            case 'success':
                return 'text-green-700';
            case 'info':
                return 'text-blue-700';
            default:
                return 'text-red-700';
        }
    };

    const getMessageColorClass = () => {
        switch (labelMessage.type) {
            case 'error':
                return 'text-red-600';
            case 'success':
                return 'text-green-600';
            case 'info':
                return 'text-blue-600';
            default:
                return 'text-red-600';
        }
    };

    return (
        <div className={`${getBaseClasses()} ${getTypeClasses()}`}>
            <div className={`${getLabelColorClass()} font-bold`}>{labelMessage.label}</div>
            <div className={`${getMessageColorClass()} text-sm mt-1`}>{labelMessage.message}</div>
        </div>
    );
};

export default memo(StatusMessage);
