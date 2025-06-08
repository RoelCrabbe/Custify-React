import ErrorLogManagementTable from '@components/admin/errorLogManagement/ErrorLogManagementTable';
import FormContainer from '@components/ui/FormContainer';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorLog } from '@types';

interface Props {
    errorLogs: ErrorLog[];
    isError: boolean;
    isLoading: boolean;
    error: unknown;
    onRetry: () => void;
    onUpdate: (updatedErrorLog: ErrorLog) => void;
}

const ErrorLogManagement: React.FC<Props> = ({
    errorLogs,
    isError,
    isLoading,
    error,
    onRetry,
    onUpdate,
}) => {
    return (
        <>
            <FormContainer.Card className="overflow-hidden h-full">
                <FormContainer className="flex flex-col h-full">
                    <header className="user-management-header">
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon icon={faUsers} />
                            <h2>Error Logs</h2>
                        </div>
                        <p className="text-sm text-gray-600">
                            Manage and monitor stack trace errors
                        </p>
                    </header>

                    <div className="flex-1 flex flex-col min-h-0">
                        <ErrorLogManagementTable
                            errorLogs={errorLogs}
                            isError={isError}
                            isLoading={isLoading}
                            error={error}
                            onRetry={onRetry}
                            onUpdate={onUpdate}
                        />
                    </div>
                </FormContainer>
            </FormContainer.Card>
        </>
    );
};

export default ErrorLogManagement;
