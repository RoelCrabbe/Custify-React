import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import StatusMessage from '@components/ui/StatusMessage';
import { faDownload, faEdit, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import {
    ErrorLog,
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
    onEdit: () => void;
    onClose: () => void;
}

const ErrorLogDetailsModal: React.FC<Props> = ({ errorLog, onEdit, onClose }) => {
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    useEffect(() => {
        setLabelMessage({
            label: 'Unexpected Error',
            message: errorLog.errorMessage,
            type: 'error',
        });
    }, [errorLog]);

    return (
        <>
            <FormContainer.Modal>
                <FormContainer.Card className="relative flex flex-col gap-6 mx-auto p-6 w-[800px] max-h-[90vh]">
                    <header className="user-details-header">
                        <h3>Error Log Details</h3>
                        <button type="button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} className="h-5 w-5" />
                        </button>
                    </header>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <section className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Error ID
                                    </label>
                                    <span className="font-mono font-bold text-lg text-gray-900">
                                        #{errorLog.id || 'N/A'}
                                    </span>
                                </section>
                                <section className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        HTTP Method
                                    </label>
                                    <span
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium w-fit ${getErrorHttpMethodColor(errorLog.httpMethod)}`}>
                                        <FontAwesomeIcon
                                            icon={getErrorHttpMethodIcon(errorLog.httpMethod)}
                                            className="user-management__icon"
                                        />
                                        {capitalizeFirstLetter(errorLog.httpMethod)}
                                    </span>
                                </section>
                            </div>
                            <section className="flex flex-col gap-1 text-right">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Request Path
                                </label>
                                <span className="text-sm font-mono text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-md">
                                    {errorLog.requestPath}
                                </span>
                            </section>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <FormContainer.Column className="space-y-4">
                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Error Type
                                </label>
                                <span
                                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getErrorTypeColor(errorLog.type)}`}>
                                    <FontAwesomeIcon
                                        icon={getErrorTypeIcon(errorLog.type)}
                                        className="user-management__icon"
                                    />
                                    {errorLog.type}
                                </span>
                            </section>

                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Severity
                                </label>
                                <span
                                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getErrorSeverityColor(errorLog.severity)}`}>
                                    <FontAwesomeIcon
                                        icon={getErrorSeverityIcon(errorLog.severity)}
                                        className="user-management__icon"
                                    />
                                    {errorLog.severity}
                                </span>
                            </section>
                        </FormContainer.Column>

                        <FormContainer.Column className="space-y-4">
                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Status
                                </label>
                                <span
                                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getErrorStatusColor(errorLog.status)}`}>
                                    <FontAwesomeIcon
                                        icon={getErrorStatusIcon(errorLog.status)}
                                        className="user-management__icon"
                                    />
                                    {errorLog.status}
                                </span>
                            </section>

                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Is Archived
                                </label>
                                <span className="text-sm text-gray-800">
                                    {errorLog.isArchived ? 'Yes' : 'No'}
                                </span>
                            </section>
                        </FormContainer.Column>

                        <FormContainer.Column className="space-y-4">
                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Archived By
                                </label>
                                <span className="text-sm text-gray-800">
                                    {errorLog.archivedBy ? errorLog.archivedBy : 'N/A'}
                                </span>
                            </section>

                            <section className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Archived Date
                                </label>
                                <span className="text-sm text-gray-800">
                                    {errorLog.archivedDate
                                        ? new Date(errorLog.archivedDate).toLocaleString()
                                        : 'N/A'}
                                </span>
                            </section>
                        </FormContainer.Column>
                    </div>

                    <section className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Error Message
                        </label>
                        {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                    </section>

                    <section className="flex flex-col gap-2">
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
                    </section>

                    <div className="flex justify-between gap-4 pt-4 border-t border-gray-200">
                        <Button.Secondary onClick={() => {}}>
                            <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                            Export Log
                        </Button.Secondary>

                        <Button.Primary onClick={onEdit}>
                            <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                            Edit Log
                        </Button.Primary>
                    </div>
                </FormContainer.Card>
            </FormContainer.Modal>
        </>
    );
};

export default ErrorLogDetailsModal;
