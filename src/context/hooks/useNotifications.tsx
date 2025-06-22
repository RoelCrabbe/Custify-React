import { useRequireAuth } from '@hooks/useAuthGuard';
import { useEntityList } from '@hooks/useEntity';
import { updateNotifications } from '@lib';
import { notificationService } from '@services/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Notification } from '@types';
import { useEffect } from 'react';

export const useNotifications = () => {
    const queryClient = useQueryClient();
    const { shouldRender } = useRequireAuth();
    const {
        entities: notifications,
        handleUpdate,
        safeSetEntities,
    } = useEntityList<Notification>([]);

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

    return {
        shouldRender,
        isLoading,
        notifications,
        onUpdate,
        onRetry,
    };
};
