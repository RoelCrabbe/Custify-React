import NotificationCard from '@components/notification/NotificationCard';
import Button from '@components/ui/Button';
import Card from '@components/ui/container/Card';
import Centered from '@components/ui/container/Centered';
import Column from '@components/ui/container/Column';
import Row from '@components/ui/container/Row';
import { faBell, faEnvelopeOpenText, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notificationService } from '@services/index';
import { Notification } from '@types';

interface Props {
    notifications: Notification[];
    onRetry: () => void;
    onUpdate: (updatedNotification: Notification) => void;
}

const NotificationOverview: React.FC<Props> = ({ notifications, onRetry, onUpdate }: Props) => {
    const markAllAsRead = async () => {
        const updatedNotifications = await notificationService.markAllAsRead();
        if (updatedNotifications.ok) onRetry();
    };

    return (
        <>
            <Card className={'px-6 py-4'}>
                <Row className={'justify-between'}>
                    <Row>
                        <Centered className={'w-12 h-12 bg-blue-200 rounded-lg'}>
                            <FontAwesomeIcon icon={faBell} className={'w-6 h-6 text-blue-600'} />
                        </Centered>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-gray-600">
                                {notifications.length > 0
                                    ? `${notifications.length} unread notification${notifications.length !== 1 ? 's' : ''}`
                                    : 'Stay updated with your latest notifications'}
                            </p>
                        </div>
                    </Row>

                    <Row>
                        {notifications.length <= 3 && (
                            <Button.Secondary onClick={onRetry}>
                                <FontAwesomeIcon icon={faSyncAlt} className={'w-4 h-4'} />
                                Refresh
                            </Button.Secondary>
                        )}

                        {notifications.length !== 0 && (
                            <Button.Primary onClick={markAllAsRead}>
                                <FontAwesomeIcon icon={faEnvelopeOpenText} className={'w-4 h-4'} />
                                Mark all as read
                            </Button.Primary>
                        )}
                    </Row>
                </Row>
            </Card>

            <Column>
                {notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onUpdate={onUpdate}
                    />
                ))}
            </Column>
        </>
    );
};

export default NotificationOverview;
