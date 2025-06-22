import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotifications } from '@hooks/useNotifications';
import { useNotificationWS } from '@hooks/useNotificationWS';
import Link from 'next/link';

const NotificationWidget: React.FC = () => {
    const { notifications, onRetry } = useNotifications();
    useNotificationWS(() => onRetry());

    const count = notifications.length ?? 0;

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
