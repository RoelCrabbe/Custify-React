import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Row from '@components/ui/container/Row';
import UserAvatar from '@components/ui/UserAvatar';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter, formatDateOnly } from '@lib';
import {
    getNotificationCategoryColor,
    getNotificationCategoryIcon,
    getNotificationPriorityColor,
    getNotificationPriorityIcon,
    Notification,
} from '@types';

interface Props {
    notification: Notification;
}

const NotificationCard: React.FC<Props> = ({ notification }: Props) => {
    return (
        <>
            <Card className={'px-6 py-4'}>
                <Column>
                    <Row className={'justify-between'}>
                        <Row>
                            <Badge
                                size={'md'}
                                text={capitalizeFirstLetter(notification.priority)}
                                icon={getNotificationPriorityIcon(notification.priority)}
                                color={getNotificationPriorityColor(notification.priority)}
                            />
                            <Badge
                                size={'md'}
                                text={capitalizeFirstLetter(notification.category)}
                                icon={getNotificationCategoryIcon(notification.category)}
                                color={getNotificationCategoryColor(notification.category)}
                            />
                        </Row>
                        <Button.Ghost
                            onClick={() => {}}
                            className={'text-blue-600 hover:text-blue-800'}>
                            Mark as read
                        </Button.Ghost>
                    </Row>

                    <h2 className="text-xl font-semibold text-gray-900">{notification.title}</h2>

                    <p className="text-md text-gray-600">{notification.body}</p>

                    <footer className="pt-4 border-t border-gray-100">
                        <Row className={'justify-between'}>
                            <Row className={'className="text-gray-600 text-sm'}>
                                {notification.sender ? (
                                    <>
                                        <UserAvatar size={'xs'} user={notification.sender} />
                                        <span>
                                            From:{' '}
                                            <span className="font-semibold">
                                                {notification.sender.firstName}{' '}
                                                {notification.sender.lastName}
                                            </span>
                                        </span>
                                    </>
                                ) : (
                                    <span className="font-semibold">System notification</span>
                                )}
                            </Row>
                            <Row gap={'2'} className="text-sm text-gray-500">
                                <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                                <span>{formatDateOnly(notification.sentDate)}</span>
                            </Row>
                        </Row>
                    </footer>
                </Column>
            </Card>
        </>
    );
};

export default NotificationCard;
