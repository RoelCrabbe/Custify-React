import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import Row from '@components/ui/container/Row';
import UserAvatar from '@components/ui/UserAvatar';
import { faEdit, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { notificationService } from '@services/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getUserRoleColor,
    getUserStatusColor,
    getUserStatusIcon,
    NotificationCategory,
    NotificationPriority,
    NotificationStatus,
    User,
} from '@types';
import { useState } from 'react';

interface Props {
    user: User;
}

const UserEditModalHeader: React.FC<Props> = ({ user }) => {
    const queryClient = useQueryClient();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const { data: notificationsData, isLoading } = useQuery({
        queryKey: ['reported-profile-picture', user.id],
        staleTime: 10 * 60 * 1000,
        enabled: user.id !== undefined,
        queryFn: async () => {
            const response = await notificationService.getUnreadProfilePictureReportsByUserId(
                user.id as number,
            );
            return response.ok ? await response.json() : [];
        },
    });

    const handleReport = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 2000);

        const formData: any = {
            title: 'Reported Profile Picture',
            body: `${user.firstName} ${user.lastName} (${user.userName})'s profile picture has been reported for violating guidelines. Please review and update your profile image immediately.`,
            category: NotificationCategory.System,
            priority: NotificationPriority.High,
            status: NotificationStatus.Sent,
            recipientById: user.id,
        };

        await notificationService.createNotification(formData);
        queryClient.invalidateQueries({ queryKey: ['reported-profile-picture', user.id] });
    };

    return (
        <Card className={'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative'}>
            {!isLoading && notificationsData?.length === 0 && (
                <div className="absolute bottom-3 right-3">
                    <Button.Ghost
                        onClick={handleReport}
                        size={'sm'}
                        disabled={isButtonDisabled}
                        className="text-white hover:text-blue-100 hover:bg-white/10 border-white/20 hover:border-white/30 active:bg-white/20 active:text-white focus:bg-white/10 focus:text-white focus:ring-white/20">
                        <Row gap={'2'}>
                            <FontAwesomeIcon icon={faEdit} />
                            Report Photo
                        </Row>
                    </Button.Ghost>
                </div>
            )}
            <Container className={`p-4`}>
                <Column className={'items-center'}>
                    <UserAvatar user={user} size={'lg'} />
                    <Column className={'items-center'} gap={'0'}>
                        <h4 className="text-lg font-semibold text-white tracking-tight">
                            {user.firstName} {user.lastName}
                        </h4>
                        <span className="text-sm text-blue-100">@{user.userName}</span>
                    </Column>
                    <Row>
                        <Badge
                            size={'sm'}
                            text={capitalizeFirstLetter(user.role)}
                            icon={faShieldAlt}
                            color={getUserRoleColor(user.role)}
                        />
                        <Badge
                            size={'sm'}
                            text={capitalizeFirstLetter(user.status)}
                            icon={getUserStatusIcon(user.status)}
                            color={getUserStatusColor(user.status)}
                        />
                    </Row>
                </Column>
            </Container>
        </Card>
    );
};

export default UserEditModalHeader;
