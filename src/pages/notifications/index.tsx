import MainPageLayout from '@components/layout/MainPageLayout';
import NotificationOverview from '@components/notification/NotificationOverview';
import Column from '@components/ui/container/Column';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { notificationService } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { Notification } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

const NotificationsPage: React.FC = () => {
    const { shouldRender } = useRequireAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const { data: notificationsData, isLoading: notificationsIsLoading } = useQuery({
        queryKey: ['user-notifications'],
        staleTime: 10 * 60 * 1000,
        enabled: shouldRender,
        queryFn: async () => {
            const response = await notificationService.getCurrentUserNotifications();
            return response.ok ? await response.json() : [];
        },
    });

    useEffect(() => {
        if (notificationsData && Array.isArray(notificationsData)) {
            setNotifications(notificationsData);
        }
    }, [notificationsData]);

    return (
        <>
            <MainPageLayout
                pageName={'Notification Page'}
                description={'Notification Page'}
                isLoading={notificationsIsLoading || !shouldRender}>
                <Column gap={'8'} className="max-w-6xl mx-auto w-full">
                    <NotificationOverview notifications={notifications} />
                </Column>
            </MainPageLayout>
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

export default NotificationsPage;
