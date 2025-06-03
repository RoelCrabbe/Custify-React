import { LabelMessage } from '@types';
import React, { memo } from 'react';

interface Props {
    labelMessage: LabelMessage;
}

const StatusMessage: React.FC<Props> = ({ labelMessage }: Props) => {
    const isError = 'type' in labelMessage ? labelMessage.type === 'error' : true;

    const getBaseClasses = () => 'border-2 rounded-xl p-4 text-center';
    const getErrorClasses = () => 'bg-red-100 border-red-500';
    const getSuccessClasses = () => 'bg-green-100 border-green-500';

    const getLabelColorClass = () => (isError ? 'text-red-700' : 'text-green-700');
    const getMessageColorClass = () => (isError ? 'text-red-600' : 'text-green-600');

    return (
        <>
            <div
                className={`${getBaseClasses()} ${isError ? getErrorClasses() : getSuccessClasses()}`}>
                <div className={`${getLabelColorClass()} font-bold`}>{labelMessage.label}</div>
                <div className={`${getMessageColorClass()} text-sm mt-1`}>
                    {labelMessage.message}
                </div>
            </div>
        </>
    );
};

export default memo(StatusMessage);
