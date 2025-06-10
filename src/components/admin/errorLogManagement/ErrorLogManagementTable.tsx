import ErrorLogDetailsModal from '@components/admin/errorLogManagement/ErrorLogDetailsModal';
import TableError from '@components/table/TableError';
import TableLoading from '@components/table/TableLoading';
import Button from '@components/ui/Button';
import { faArrowsUpDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { errorLogService } from '@services/index';
import {
    ErrorLog,
    getErrorHttpMethodColor,
    getErrorHttpMethodIcon,
    getErrorSeverityColor,
    getErrorSeverityIcon,
    getErrorTypeColor,
    getErrorTypeIcon,
} from '@types';

import { useState } from 'react';

interface Props {
    errorLogs: ErrorLog[];
    isError: boolean;
    isLoading: boolean;
    error: unknown;
    onRetry: () => void;
    onUpdate: (updatedErrorLog: ErrorLog) => void;
}

const ErrorLogManagementTable: React.FC<Props> = ({
    errorLogs,
    isError,
    isLoading,
    error,
    onRetry,
    onUpdate,
}) => {
    const [selectedErrorLog, setSelectedErrorLog] = useState<ErrorLog | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    if (isLoading) {
        return <TableLoading text={'Loading user management info...'} />;
    }

    if (isError) {
        return (
            <TableError
                message={error instanceof Error ? error.message : 'Unknown error'}
                onRetry={onRetry}
            />
        );
    }

    const handleViewDetails = async (errorLog: ErrorLog) => {
        setSelectedErrorLog(errorLog);
        setShowDetailsModal(true);
        await handleReview(errorLog);
    };

    const handleOpenEditModal = () => {
        setShowDetailsModal(false);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setShowDetailsModal(true);
    };

    const handleCloseAllModal = () => {
        setShowDetailsModal(false);
        setShowEditModal(false);
        setSelectedErrorLog(null);
    };

    const handleReview = async (errorLog: ErrorLog) => {
        const formData: any = {
            id: errorLog.id,
        };

        try {
            errorLogService.updateErrorLog(formData);
        } catch (error) {
            console.error(error);
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
                            <th className="flex items-center justify-between">
                                Actions
                                <span>
                                    <FontAwesomeIcon
                                        icon={faArrowsUpDown}
                                        className="text-gray-400"
                                    />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {errorLogs.map((errorLog) => (
                            <tr
                                key={errorLog.id}
                                className="hover:bg-gray-100 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getErrorSeverityColor(errorLog.severity)}`}>
                                        <FontAwesomeIcon
                                            icon={getErrorSeverityIcon(errorLog.severity)}
                                            className="user-management__icon"
                                        />
                                        {errorLog.severity}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getErrorTypeColor(errorLog.type)}`}>
                                        <FontAwesomeIcon
                                            icon={getErrorTypeIcon(errorLog.type)}
                                            className="user-management__icon"
                                        />
                                        {errorLog.type}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-mono text-gray-800 bg-gray-100 border border-gray-300 px-3 py-2 rounded-md">
                                        {errorLog.requestPath}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${getErrorHttpMethodColor(errorLog.httpMethod)}`}>
                                        <FontAwesomeIcon
                                            icon={getErrorHttpMethodIcon(errorLog.httpMethod)}
                                            className="user-management__icon"
                                        />
                                        {capitalizeFirstLetter(errorLog.httpMethod)}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Button.Primary onClick={() => handleViewDetails(errorLog)}>
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            className="user-management__icon"
                                        />
                                        <span>View Details</span>
                                    </Button.Primary>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedErrorLog && (
                <>
                    {showDetailsModal && (
                        <ErrorLogDetailsModal
                            errorLog={selectedErrorLog}
                            onClose={handleCloseAllModal}
                            onEdit={handleOpenEditModal}
                        />
                    )}

                    {/* {showEditModal && (
                        <UserEditModal
                            errorLog={selectedUser}
                            onCancel={handleCloseEditModal}
                            onClose={handleCloseAllModal}
                            onUpdate={onUpdate}
                        />
                    )} */}
                </>
            )}
        </>
    );
};

export default ErrorLogManagementTable;
