import ErrorLogManagement from '@components/admin/errorLogManagement/ErrorLogManagement';
import AdminPageLayout from '@components/layout/AdminPageLayout';
import { useRequireAdmin } from '@hooks/useAuthGuard';
import { useEntityList } from '@hooks/useEntity';
import { updateErrorLogs } from '@lib';
import { errorLogService } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { ErrorLog, ErrorStatus } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

const ReportsPage: React.FC = () => {
    const { shouldRender } = useRequireAdmin();
    const [selectedStatus, setSelectedStatus] = useState<ErrorStatus>(ErrorStatus.New);
    const { entities, handleUpdate, safeSetEntities } = useEntityList<ErrorLog>([]);

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

    const {
        data: errorLogsData,
        isError,
        isLoading,
        refetch: onRetry,
    } = useQuery({
        queryKey: ['error-logs', selectedStatus],
        staleTime: 3 * 60 * 1000,
        enabled: shouldRender,
        queryFn: () => getErrorLogsByStatus(selectedStatus),
    });

    useEffect(() => {
        safeSetEntities(errorLogsData);
    }, [errorLogsData]);

    const onUpdate = (updatedErrorLog: ErrorLog) => {
        handleUpdate(updatedErrorLog, (prev) =>
            updateErrorLogs(prev, updatedErrorLog, selectedStatus),
        );
        onRetry();
    };

    return (
        <AdminPageLayout
            pageName={'User Management'}
            description={'Manage and monitor user accounts'}
            isLoading={isLoading || !shouldRender}>
            <ErrorLogManagement
                selectedStatus={selectedStatus}
                errorLogs={entities}
                isError={isError}
                isLoading={isLoading}
                onUpdate={onUpdate}
                onRetry={onRetry}
                onStatusChange={setSelectedStatus}
            />
        </AdminPageLayout>
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
