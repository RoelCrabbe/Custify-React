import ErrorLogManagementTable from '@components/admin/errorLogManagement/ErrorLogManagementTable';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorLog, ErrorStatus } from '@types';

interface Props {
    selectedStatus: ErrorStatus;
    errorLogs: ErrorLog[];
    isError: boolean;
    isLoading: boolean;
    onRetry: () => void;
    onUpdate: (updatedErrorLog: ErrorLog) => void;
    onStatusChange: (updatedStatus: ErrorStatus) => void;
}

const ErrorLogManagement: React.FC<Props> = ({
    selectedStatus,
    errorLogs,
    isError,
    isLoading,
    onRetry,
    onUpdate,
    onStatusChange,
}) => {
    const queryClient = useQueryClient();

    const getStatusCounts = (): Record<ErrorStatus, number> => {
        const queryCache = queryClient.getQueryCache();

        const getCachedCount = (status: ErrorStatus) => {
            const cachedData = queryCache.find({ queryKey: ['error-logs', status] })?.state.data;
            return Array.isArray(cachedData) ? cachedData.length : 0;
        };

        return {
            [ErrorStatus.New]: getCachedCount(ErrorStatus.New),
            [ErrorStatus.Reviewed]: getCachedCount(ErrorStatus.Reviewed),
            [ErrorStatus.Resolved]: getCachedCount(ErrorStatus.Resolved),
        };
    };

    const statusCounts = getStatusCounts();

    return (
        <Card className={'overflow-hidden h-full'}>
            <Column gap={'0'} className={'h-full'}>
                <header className="report-management-header">
                    <div className="flex items-center gap-4 p-2">
                        <FontAwesomeIcon icon={faUsers} />
                        <h2>Error Logs</h2>
                    </div>
                    <div className="report-management-status">
                        <button
                            className={`status-tab status-new first:rounded-l-md ${selectedStatus === ErrorStatus.New ? 'active' : ''}`}
                            onClick={() => onStatusChange(ErrorStatus.New)}>
                            New
                            <span className="status-count">{statusCounts[ErrorStatus.New]}</span>
                        </button>
                        <button
                            className={`status-tab status-reviewed ${selectedStatus === ErrorStatus.Reviewed ? 'active' : ''}`}
                            onClick={() => onStatusChange(ErrorStatus.Reviewed)}>
                            Reviewed
                            <span className="status-count">
                                {statusCounts[ErrorStatus.Reviewed]}
                            </span>
                        </button>
                        <button
                            className={`status-tab status-resolved last:rounded-r-md ${selectedStatus === ErrorStatus.Resolved ? 'active' : ''}`}
                            onClick={() => onStatusChange(ErrorStatus.Resolved)}>
                            Resolved
                            <span className="status-count">
                                {statusCounts[ErrorStatus.Resolved]}
                            </span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex flex-col min-h-0">
                    <ErrorLogManagementTable
                        selectedStatus={selectedStatus}
                        errorLogs={errorLogs}
                        isError={isError}
                        isLoading={isLoading}
                        onRetry={onRetry}
                        onUpdate={onUpdate}
                    />
                </div>
            </Column>
        </Card>
    );
};

export default ErrorLogManagement;
