import { ErrorLabelMessage } from '@types';
import React, { memo } from 'react';

type Props = {
    errorLabelMessage: ErrorLabelMessage;
};

const ErrorMessage: React.FC<Props> = ({ errorLabelMessage }: Props) => {
    return (
        <>
            <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4 text-center">
                <div className="text-red-700 font-bold">{errorLabelMessage.label}</div>
                <div className="text-red-600 text-sm mt-1">{errorLabelMessage.message}</div>
            </div>
        </>
    );
};

export default memo(ErrorMessage);
