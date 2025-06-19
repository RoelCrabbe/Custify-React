import ErrorLogDetailsModal from '@components/admin/errorLogManagement/ErrorLogDetailsModal';
import UserDetailsModal from '@components/admin/userManagement/UserDetailsModal';
import TableError from '@components/table/TableError';
import TableLoading from '@components/table/TableLoading';
import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import { faArrowsUpDown, faEye, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
    getErrorTypeColor,
    getErrorTypeIcon,
} from '@types';

import { useState } from 'react';

interface Props {
    selectedStatus: ErrorStatus;
    errorLogs: ErrorLog[];
    isError: boolean;
    isLoading: boolean;
    onRetry: () => void;
    onUpdate: (updatedErrorLog: ErrorLog) => void;
}

const ErrorLogManagementTable: React.FC<Props> = ({
    selectedStatus,
    errorLogs,
    isError,
    isLoading,
    onRetry,
    onUpdate,
}) => {
    const [selectedErrorLog, setSelectedErrorLog] = useState<ErrorLog | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [pendingUpdate, setPendingUpdate] = useState<ErrorLog | null>(null);
    const [hasModalUpdated, setHasModalUpdated] = useState<boolean>(false);

    if (isLoading) {
        return <TableLoading text={'Loading reports management info...'} />;
    }

    if (isError) {
        return (
            <TableError
                message={'There was an issue getting reports management info.'}
                onRetry={onRetry}
            />
        );
    }

    const isNotResolved = selectedStatus !== ErrorStatus.Resolved;

    const handleViewDetails = async (errorLog: ErrorLog) => {
        setSelectedErrorLog(errorLog);
        setHasModalUpdated(false);
        await handleReview(errorLog);
    };

    const handleCloseAllModal = () => {
        if (pendingUpdate && !hasModalUpdated) {
            onUpdate(pendingUpdate);
        }

        setPendingUpdate(null);
        setHasModalUpdated(false);
        setSelectedErrorLog(null);
        setSelectedUserId(null);
    };

    const handleShowUserDetails = (userId: number) => {
        handleCloseAllModal();
        setSelectedUserId(userId);
    };

    const handleModalUpdate = (updatedErrorLog: ErrorLog) => {
        setHasModalUpdated(true);
        onUpdate(updatedErrorLog);
    };

    const handleReview = async (errorLog: ErrorLog) => {
        const formData: any = {
            id: errorLog.id,
            status: ErrorStatus.Reviewed,
        };

        try {
            const response = await errorLogService.updateErrorLog(formData);
            const updatedErrorLog = await response.json();

            if (!response.ok) {
                return;
            }

            setPendingUpdate(updatedErrorLog);
        } catch (error) {
            console.error('Error updating error log:', error);
        }
    };

    return (
        <>
            <div className="flex-1 overflow-auto bg-white hide-scrollbar">
                <table className="user-management-table w-full table-fixed">
                    <thead className="sticky top-0 bg-gray-50 z-10">
                        <tr>
                            <th>Severity Type</th>
                            <th>Error Type</th>
                            <th>Request Path</th>
                            <th>Method</th>
                            {isNotResolved ? (
                                <th className="flex items-center justify-between">
                                    Actions
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faArrowsUpDown}
                                            className={'text-gray-400'}
                                        />
                                    </span>
                                </th>
                            ) : (
                                <th className="flex items-center justify-between">
                                    Archived Details
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faArrowsUpDown}
                                            className={'text-gray-400'}
                                        />
                                    </span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {errorLogs.map((errorLog) => (
                            <tr
                                key={errorLog.id}
                                className="hover:bg-gray-100 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge
                                        size={'sm'}
                                        text={errorLog.severity}
                                        icon={getErrorSeverityIcon(errorLog.severity)}
                                        color={getErrorSeverityColor(errorLog.severity)}
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge
                                        size={'sm'}
                                        text={errorLog.type}
                                        icon={getErrorTypeIcon(errorLog.type)}
                                        color={getErrorTypeColor(errorLog.type)}
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-mono text-gray-800 bg-gray-100 border border-gray-300 px-3 py-2 rounded-md">
                                        {errorLog.requestPath}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge
                                        size={'sm'}
                                        text={capitalizeFirstLetter(errorLog.httpMethod)}
                                        icon={getErrorHttpMethodIcon(errorLog.httpMethod)}
                                        color={getErrorHttpMethodColor(errorLog.httpMethod)}
                                    />
                                </td>

                                {isNotResolved ? (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button.Primary onClick={() => handleViewDetails(errorLog)}>
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className={'user-management__icon'}
                                            />
                                            <span>View Details</span>
                                        </Button.Primary>
                                    </td>
                                ) : (
                                    <td className="p-[1.625rem] whitespace-nowrap">
                                        <div className="report-archived-info">
                                            {errorLog.resolvedDate && errorLog.resolvedById ? (
                                                <span>
                                                    Archived on{' '}
                                                    {formatDateOnly(errorLog.resolvedDate)} by user
                                                    #{errorLog.resolvedById}
                                                </span>
                                            ) : (
                                                <span>Not Resolved</span>
                                            )}

                                            {errorLog.resolvedById && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleShowUserDetails(
                                                            errorLog.resolvedById as number,
                                                        )
                                                    }
                                                    className="text-blue-500 hover:text-blue-600 flex"
                                                    title="View user details"
                                                    aria-label="View user details">
                                                    <FontAwesomeIcon
                                                        icon={faInfoCircle}
                                                        className={'h-4 w-4'}
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedErrorLog && (
                <ErrorLogDetailsModal
                    errorLog={selectedErrorLog}
                    onClose={handleCloseAllModal}
                    onUpdate={handleModalUpdate}
                />
            )}

            {selectedUserId && (
                <UserDetailsModal userId={selectedUserId} onClose={handleCloseAllModal} />
            )}
        </>
    );
};

export default ErrorLogManagementTable;
