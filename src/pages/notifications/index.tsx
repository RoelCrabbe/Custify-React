import MainPageLayout from '@components/layout/MainPageLayout';
import NotificationOverview from '@components/notification/NotificationOverview';
import Column from '@components/ui/container/Column';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { useEntityList } from '@hooks/useEntity';
import { updateNotifications } from '@lib';
import { notificationService } from '@services/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Notification } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

const NotificationsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const { shouldRender } = useRequireAuth();
    const { entities, handleUpdate, safeSetEntities } = useEntityList<Notification>([]);

    const {
        data: notificationsData,
        isLoading,
        refetch: onRetry,
    } = useQuery({
        queryKey: ['user-notifications'],
        staleTime: 10 * 60 * 1000,
        enabled: shouldRender,
        queryFn: async () => {
            const response = await notificationService.getCurrentUserNotifications();
            return response.ok ? await response.json() : [];
        },
    });

    useEffect(() => {
        safeSetEntities(notificationsData);
    }, [notificationsData]);

    const onUpdate = (updatedNotification: Notification) => {
        handleUpdate(updatedNotification, updateNotifications);
        queryClient.setQueryData(['user-notifications'], (prev: Notification[] = []) =>
            updateNotifications(prev, updatedNotification),
        );
    };

    return (
        <MainPageLayout
            pageName={'Notification Page'}
            description={'Notification Page'}
            isLoading={isLoading || !shouldRender}>
            <Column gap={'8'} className={'max-w-6xl mx-auto w-full'}>
                <NotificationOverview
                    notifications={entities}
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
