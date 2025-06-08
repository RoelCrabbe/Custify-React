import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import StatusMessage from '@components/ui/StatusMessage';
import { faDownload, faEdit, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import {
    ErrorLog,
    getErrorSeverityColor,
    getErrorSeverityIcon,
    getErrorTypeColor,
    getErrorTypeIcon,
    getHttpMethodColor,
    getHttpMethodIcon,
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
                <FormContainer.Card className="relative flex flex-col gap-4 mx-auto p-5 w-[800px] max-h-[90vh] overflow-hidden">
                    <header className="user-details-header">
                        <h3>Error Log Details</h3>
                        <button type="button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} className="h-5 w-5" />
                        </button>
                    </header>

                    <div className="error-log-details-info">
                        <section>
                            <label>Error ID</label>
                            <span className="font-mono text-lg font-semibold">
                                #{errorLog.id || 'N/A'}
                            </span>
                        </section>
                        <section>
                            <label>HTTP Method</label>
                            <span
                                className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getHttpMethodColor(errorLog.httpMethod)}`}>
                                <FontAwesomeIcon
                                    icon={getHttpMethodIcon(errorLog.httpMethod)}
                                    className="user-management__icon"
                                />
                                {capitalizeFirstLetter(errorLog.httpMethod)}
                            </span>
                        </section>
                    </div>

                    <div className="px-2">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <FormContainer.Column>
                                <section className="flex flex-col gap-2 text-sm text-gray-600">
                                    <label className="font-medium">Error Type</label>
                                    <span
                                        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getErrorTypeColor(errorLog.type)}`}>
                                        <FontAwesomeIcon
                                            icon={getErrorTypeIcon(errorLog.type)}
                                            className="user-management__icon"
                                        />
                                        {errorLog.type}
                                    </span>
                                </section>

                                <section className="flex flex-col gap-2 text-sm text-gray-600">
                                    <label className="font-medium">Severity</label>
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

                            <div>
                                <section className="flex flex-col gap-2 text-sm text-gray-600">
                                    <label className="font-medium">Request Path</label>
                                    <span className="text-sm font-mono text-gray-800 bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg w-fit">
                                        {errorLog.requestPath}
                                    </span>
                                </section>
                            </div>
                        </div>

                        <FormContainer.Column>
                            <section className="flex flex-col gap-2 text-sm text-gray-600">
                                <label className="font-medium">Error Message</label>
                                {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                            </section>

                            <section className="flex flex-col gap-2 text-sm text-gray-600">
                                <label className="font-medium">Stack Trace</label>
                                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 max-h-60 overflow-auto">
                                    <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                                        {errorLog.stackTrace}
                                    </pre>
                                </div>
                            </section>
                        </FormContainer.Column>
                    </div>

                    <div className="flex justify-between gap-4 pt-4 border-t">
                        <Button.Secondary onClick={() => {}}>
                            <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                            Export Log
                        </Button.Secondary>

                        <div className="flex gap-2">
                            <Button.Secondary onClick={onClose}>Close</Button.Secondary>
                            <Button.Primary onClick={onEdit}>
                                <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                                Edit Log
                            </Button.Primary>
                        </div>
                    </div>
                </FormContainer.Card>
            </FormContainer.Modal>
        </>
    );
};

export default ErrorLogDetailsModal;
