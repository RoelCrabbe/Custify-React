import ErrorLogManagement from '@components/admin/errorLogManagement/ErrorLogManagement';
import AdminPageLayout from '@components/layout/AdminPageLayout';
import { useRequireAdmin } from '@hooks/useAuthGuard';
import { errorLogService } from '@services/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorLog, ErrorStatus } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

const ReportsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const { shouldRender, currentUser } = useRequireAdmin();
    const [selectedStatus, setSelectedStatus] = useState<ErrorStatus>(ErrorStatus.New);
    const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);

    const {
        data: errorLogsData,
        error: errorLogsError,
        isError: errorLogsIsError,
        isLoading: errorLogsIsLoading,
    } = useQuery({
        queryKey: ['error-logs', selectedStatus],
        staleTime: 3 * 60 * 1000,
        enabled: shouldRender,
        queryFn: () => getErrorLogsByStatus(selectedStatus),
    });

    const handleRetry = () => {
        queryClient.invalidateQueries({ queryKey: ['user-management'] });
    };

    const getErrorLogsByStatus = async (status: ErrorStatus) => {
        let response;
        switch (status) {
            case ErrorStatus.New:
                response = await errorLogService.getAllNewErrorLogs();
                break;
            case ErrorStatus.Reviewed:
                response = await errorLogService.getAllReviewedErrorLogs();
                break;
            case ErrorStatus.Resolved:
                response = await errorLogService.getAllResolvedErrorLogs();
                break;
            default:
                response = await errorLogService.getAllNewErrorLogs();
        }
        return response.ok ? await response.json() : [];
    };

    const handleErrorLogUpdate = (updatedErrorLog: ErrorLog) => {
        const { id, status } = updatedErrorLog;
        const statusChanged = status !== selectedStatus;

        setErrorLogs((prev) => {
            const existing = prev.find((log) => log.id === id);
            if (!existing) return prev;

            return statusChanged
                ? prev.filter((log) => log.id !== id)
                : prev.map((log) => (log.id === id ? updatedErrorLog : log));
        });

        queryClient.setQueryData(
            ['error-logs', selectedStatus],
            (oldCache: ErrorLog[] | undefined) => {
                oldCache?.filter((log) => log.id !== id);
            },
        );

        if (statusChanged && queryClient.getQueryData(['error-logs', status])) {
            queryClient.setQueryData(['error-logs', status], (oldCache: ErrorLog[] | undefined) => {
                if (!oldCache) return [updatedErrorLog];
                const existingIndex = oldCache.findIndex((log) => log.id === id);
                return existingIndex === -1
                    ? [...oldCache, updatedErrorLog]
                    : oldCache.map((log) => (log.id === id ? updatedErrorLog : log));
            });
        }
    };

    const handleStatusChange = (status: ErrorStatus) => {
        setSelectedStatus(status);
    };

    useEffect(() => {
        if (errorLogsData && Array.isArray(errorLogsData)) {
            setErrorLogs(errorLogsData);
        }
    }, [errorLogsData]);

    return (
        <>
            <AdminPageLayout
                pageName={'User Management'}
                description={'Manage and monitor user accounts'}
                isLoading={errorLogsIsLoading || !shouldRender}>
                <ErrorLogManagement
                    selectedStatus={selectedStatus}
                    errorLogs={errorLogs}
                    error={errorLogsError}
                    isError={errorLogsIsError}
                    isLoading={errorLogsIsLoading}
                    onUpdate={handleErrorLogUpdate}
                    onRetry={handleRetry}
                    onStatusChange={handleStatusChange}
                />
            </AdminPageLayout>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default ReportsPage;
