import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Modal from '@components/ui/container/Modal';
import StatusMessage from '@components/ui/StatusMessage';
import { faDownload, faEdit, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter, formatDateOnly } from '@lib';
import { errorLogService } from '@services/index';
import {
    ErrorLog,
    ErrorStatus,
    getErrorHttpMethodColor,
    getErrorHttpMethodIcon,
    getErrorSeverityColor,
    getErrorSeverityIcon,
    getErrorStatusColor,
    getErrorStatusIcon,
    getErrorTypeColor,
    getErrorTypeIcon,
    LabelMessage,
} from '@types';
import { useEffect, useState } from 'react';

interface Props {
    errorLog: ErrorLog;
    onClose: () => void;
    onUpdate: (updatedErrorLog: ErrorLog) => void;
}

const ErrorLogDetailsModal: React.FC<Props> = ({ errorLog, onClose, onUpdate }) => {
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    useEffect(() => {
        setLabelMessage({
            label: 'Unexpected Error',
            message: errorLog.errorMessage,
            type: 'error',
        });
    }, []);

    const handleResolved = async (e: React.FormEvent) => {
        e.preventDefault();
        setLabelMessage(undefined);

        const formData: any = {
            id: errorLog.id,
            status: ErrorStatus.Resolved,
        };

        try {
            const errorLogResponse = await errorLogService.updateErrorLog(formData);
            const errorLogJson = await errorLogResponse.json();

            if (!errorLogResponse.ok) {
                return;
            }

            setTimeout(() => {
                onUpdate(errorLogJson);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error updating error log:', error);
        }
    };

    return (
        <>
            <Modal>
                <Card className={'relative mx-auto p-6 w-[800px] max-h-[90vh]'}>
                    <Column gap={'6'}>
                        <header className="user-details-header">
                            <h3>Error Log Details</h3>
                            <button type="button" onClick={onClose}>
                                <FontAwesomeIcon icon={faXmarkCircle} className={'h-5 w-5'} />
                            </button>
                        </header>

                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <Column gap={'1'}>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Error ID
                                        </label>
                                        <span className="font-mono font-bold text-lg text-gray-900">
                                            #{errorLog.id || 'N/A'}
                                        </span>
                                    </Column>
                                    <Column gap={'1'}>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            HTTP Method
                                        </label>
                                        <Badge
                                            size={'sm'}
                                            text={capitalizeFirstLetter(errorLog.httpMethod)}
                                            icon={getErrorHttpMethodIcon(errorLog.httpMethod)}
                                            color={getErrorHttpMethodColor(errorLog.httpMethod)}
                                        />
                                    </Column>
                                </div>
                                <Column gap={'1'} className={'text-right'}>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Request Path
                                    </label>
                                    <span className="text-sm font-mono text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-md">
                                        {errorLog.requestPath}
                                    </span>
                                </Column>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-6">
                            <Column className={'space-y-4'}>
                                <Column gap={'2'}>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Error Type
                                    </label>
                                    <Badge
                                        size={'sm'}
                                        text={errorLog.type}
                                        icon={getErrorTypeIcon(errorLog.type)}
                                        color={getErrorTypeColor(errorLog.type)}
                                    />
                                </Column>

                                <Column gap={'2'}>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Severity
                                    </label>
                                    <Badge
                                        size={'sm'}
                                        text={errorLog.severity}
                                        icon={getErrorSeverityIcon(errorLog.severity)}
                                        color={getErrorSeverityColor(errorLog.severity)}
                                    />
                                </Column>
                            </Column>

                            <Column className={'space-y-4'}>
                                <Column gap={'2'}>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Status
                                    </label>
                                    <Badge
                                        size={'sm'}
                                        text={errorLog.status}
                                        icon={getErrorStatusIcon(errorLog.status)}
                                        color={getErrorStatusColor(errorLog.status)}
                                    />
                                </Column>
                            </Column>

                            <Column className={'space-y-4'}>
                                <Column gap={'2'}>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Resolved By
                                    </label>
                                    <span className="text-sm text-gray-800">
                                        {errorLog.resolvedById ? errorLog.resolvedById : 'N/A'}
                                    </span>
                                </Column>

                                <Column gap={'2'}>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Resolved Date
                                    </label>
                                    <span className="text-sm text-gray-800">
                                        {formatDateOnly(errorLog.resolvedDate)}
                                    </span>
                                </Column>
                            </Column>
                        </div>

                        <Column gap={'2'}>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Error Message
                            </label>
                            {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                        </Column>

                        <Column gap={'2'}>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Stack Trace
                            </label>
                            <div className="bg-gray-900 text-gray-100 rounded-lg border shadow-inner">
                                <div className="bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
                                    <span className="text-xs font-medium text-gray-300">
                                        Stack Trace Output
                                    </span>
                                </div>
                                <div className="p-4 max-h-60 overflow-auto">
                                    <pre className="text-xs font-mono whitespace-pre-wrap break-words leading-relaxed">
                                        {errorLog.stackTrace}
                                    </pre>
                                </div>
                            </div>
                        </Column>

                        <div className="flex justify-between gap-4 pt-4 border-t border-gray-200">
                            <Button.Secondary onClick={() => {}}>
                                <FontAwesomeIcon icon={faDownload} className={'h-4 w-4'} />
                                Export Log
                            </Button.Secondary>

                            <Button.Primary onClick={handleResolved}>
                                <FontAwesomeIcon icon={faEdit} className={'h-4 w-4'} />
                                Mark Resolved
                            </Button.Primary>
                        </div>
                    </Column>
                </Card>
            </Modal>
        </>
    );
};

export default ErrorLogDetailsModal;
