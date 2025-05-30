import { LabelMessage } from '@types';
import React, { memo } from 'react';

type Props = {
    labelMessage: LabelMessage;
};

const StatusMessage: React.FC<Props> = ({ labelMessage }: Props) => {
    const isError = 'type' in labelMessage ? labelMessage.type === 'error' : true;

    const baseClasses = 'border-2 rounded-xl p-4 text-center';
    const errorClasses = 'bg-red-100 border-red-500';
    const successClasses = 'bg-green-100 border-green-500';

    const labelColorClass = isError ? 'text-red-700' : 'text-green-700';
    const messageColorClass = isError ? 'text-red-600' : 'text-green-600';

    return (
        <div className={`${baseClasses} ${isError ? errorClasses : successClasses}`}>
            <div className={`${labelColorClass} font-bold`}>{labelMessage.label}</div>
            <div className={`${messageColorClass} text-sm mt-1`}>{labelMessage.message}</div>
        </div>
    );
};

export default memo(StatusMessage);
