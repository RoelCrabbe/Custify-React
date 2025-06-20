import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { useEntityList } from '@hooks/useEntity';
import { useNotificationWS } from '@hooks/useNotificationWS';
import { notificationService } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { Notification } from '@types';
import Link from 'next/link';
import { useEffect } from 'react';

const NotificationWidget: React.FC = () => {
    const { shouldRender } = useRequireAuth();
    const { entities, safeSetEntities } = useEntityList<Notification>([]);
    const count = entities.length ?? 0;

    const { data: notificationsData, refetch: onRetry } = useQuery({
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

    useNotificationWS(() => onRetry());

    return (
        <div className="settings-widget">
            <Link
                href={'/notifications'}
                className="settings-button"
                aria-label={`Notifications (${count} unread)`}>
                <FontAwesomeIcon icon={faBell} className={'settings-icon'} />
                {count > 0 && (
                    <span className="absolute flex items-center justify-center top-1 -left-4 bg-red-600 text-white rounded-full w-5 h-5 text-xs font-bold leading-none translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        {count}
                    </span>
                )}
            </Link>
        </div>
    );
};

export default NotificationWidget;
