import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import ModalContainer from '@components/ui/container/ModalContainer';
import Row from '@components/ui/container/Row';
import Label from '@components/ui/content/Label';
import StatusMessage from '@components/ui/StatusMessage';
import { faDownload, faEdit, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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
    const [displayLabelMessage, setDisplayLabelMessage] = useState<LabelMessage>();
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    useEffect(() => {
        setDisplayLabelMessage({
            label: 'Unexpected Error',
            message: errorLog.errorMessage,
            type: 'error',
        });
    }, [displayLabelMessage]);

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

            setLabelMessage({
                label: 'Marked the error log as resolved!',
                message: 'Closing the form...',
                type: 'success',
            });

            setTimeout(() => {
                onUpdate(errorLogJson);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error updating error log:', error);
        }
    };

    return (
        <ModalContainer
            onClose={onClose}
            label={'Error Log Details'}
            icon={faTriangleExclamation}
            gap={'4'}
            footer={
                <div className="flex justify-between gap-4">
                    <Button.Secondary onClick={() => {}}>
                        <FontAwesomeIcon icon={faDownload} className={'h-4 w-4'} />
                        Export Log
                    </Button.Secondary>

                    <Button.Primary onClick={handleResolved}>
                        <FontAwesomeIcon icon={faEdit} className={'h-4 w-4'} />
                        Mark Resolved
                    </Button.Primary>
                </div>
            }
            className={'w-[960px]'}>
            <form>
                <Column>
                    <Card className={'bg-gradient-to-br from-gray-100 to-gray-200 p-4'}>
                        <Row className={'justify-between'}>
                            <Row>
                                <Column gap={'2'} className={'items-center'}>
                                    <Label>Error ID</Label>
                                    <span className="font-mono font-bold text-lg text-gray-900">
                                        #{errorLog.id || 'N/A'}
                                    </span>
                                </Column>
                                <Column gap={'2'} className={'items-center'}>
                                    <Label>HTTP Method</Label>
                                    <Badge
                                        size={'sm'}
                                        text={capitalizeFirstLetter(errorLog.httpMethod)}
                                        icon={getErrorHttpMethodIcon(errorLog.httpMethod)}
                                        color={getErrorHttpMethodColor(errorLog.httpMethod)}
                                    />
                                </Column>
                            </Row>
                            <Column gap={'2'} className={'text-right'}>
                                <Label>Request Path</Label>
                                <span className="text-sm font-mono text-gray-900 bg-white border border-gray-300 px-3 py-2 rounded-md">
                                    {errorLog.requestPath}
                                </span>
                            </Column>
                        </Row>
                    </Card>

                    <div className="grid grid-cols-3 gap-4">
                        <Column>
                            <Column gap={'2'}>
                                <Label>Error Type</Label>
                                <Badge
                                    size={'sm'}
                                    text={errorLog.type}
                                    icon={getErrorTypeIcon(errorLog.type)}
                                    color={getErrorTypeColor(errorLog.type)}
                                />
                            </Column>

                            <Column gap={'2'}>
                                <Label>Severity</Label>
                                <Badge
                                    size={'sm'}
                                    text={errorLog.severity}
                                    icon={getErrorSeverityIcon(errorLog.severity)}
                                    color={getErrorSeverityColor(errorLog.severity)}
                                />
                            </Column>
                        </Column>

                        <Column>
                            <Column gap={'2'}>
                                <Label>Status</Label>
                                <Badge
                                    size={'sm'}
                                    text={errorLog.status}
                                    icon={getErrorStatusIcon(errorLog.status)}
                                    color={getErrorStatusColor(errorLog.status)}
                                />
                            </Column>
                        </Column>

                        <Column>
                            <Column gap={'2'}>
                                <Label>Resolved By</Label>
                                <span className="text-sm text-gray-900">
                                    {errorLog.resolvedById ? errorLog.resolvedById : 'N/A'}
                                </span>
                            </Column>

                            <Column gap={'2'}>
                                <Label>Resolved Date</Label>
                                <span className="text-sm text-gray-900">
                                    {formatDateOnly(errorLog.resolvedDate)}
                                </span>
                            </Column>
                        </Column>
                    </div>

                    <Column gap={'2'}>
                        <Label>Error Message</Label>
                        {displayLabelMessage && (
                            <StatusMessage labelMessage={displayLabelMessage} />
                        )}
                    </Column>

                    <Column gap={'2'}>
                        <Label>Stack Trace</Label>
                        <Card
                            className={
                                'bg-gradient-to-br from-gray-700 to-gray-900 text-gray-100 shadow-inner'
                            }>
                            <div className="bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
                                <span className="text-xs font-medium text-gray-100">
                                    Stack Trace Output
                                </span>
                            </div>
                            <div className="p-4 max-h-60 overflow-auto mr-2">
                                <pre className="text-xs font-mono whitespace-pre-wrap break-words leading-relaxed">
                                    {errorLog.stackTrace}
                                </pre>
                            </div>
                        </Card>
                    </Column>

                    {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                </Column>
            </form>
        </ModalContainer>
    );
};

export default ErrorLogDetailsModal;
