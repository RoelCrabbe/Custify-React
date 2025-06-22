import MainPageLayout from '@components/layout/MainPageLayout';
import NotificationOverview from '@components/notification/NotificationOverview';
import Column from '@components/ui/container/Column';
import { useNotifications } from '@hooks/useNotifications';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NotificationsPage: React.FC = () => {
    const { shouldRender, isLoading, notifications, onUpdate, onRetry } = useNotifications();

    return (
        <MainPageLayout
            pageName={'Notification Page'}
            description={'Notification Page'}
            isLoading={isLoading || !shouldRender}>
            <Column gap={'8'} className={'max-w-6xl mx-auto w-full'}>
                <NotificationOverview
                    notifications={notifications}
                    onRetry={onRetry}
                    onUpdate={onUpdate}
                />
            </Column>
        </MainPageLayout>
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

export default NotificationsPage;
