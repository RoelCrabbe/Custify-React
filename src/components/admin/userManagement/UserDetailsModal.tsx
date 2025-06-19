import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Centered from '@components/ui/container/Centered';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import ModalContainer from '@components/ui/container/ModalContainer';
import Row from '@components/ui/container/Row';
import Label from '@components/ui/content/Label';
import UserAvatar from '@components/ui/UserAvatar';
import {
    faEdit,
    faEnvelope,
    faPhone,
    faShieldAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { userService } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { getUserRoleColor, getUserStatusColor, getUserStatusIcon, User } from '@types';

interface PropsBase {
    onEdit?: () => void;
    onClose: () => void;
}

interface PropsWithUser extends PropsBase {
    user: User;
    userId?: never;
}

interface PropsWithUserId extends PropsBase {
    userId: number;
    user?: never;
}

type Props = PropsWithUser | PropsWithUserId;

const UserDetailsModal: React.FC<Props> = ({ user, userId, onEdit, onClose }) => {
    const shouldFetch = !user && typeof userId === 'number';

    const {
        data: fetchedUser,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['user-by-id', userId],
        enabled: shouldFetch,
        staleTime: 10 * 60 * 1000,
        queryFn: async () => {
            const response = await userService.getUserById(userId as number);
            if (!response.ok) throw new Error(`User with id ${userId} not found`);
            return (await response.json()) as User;
        },
    });

    const resolvedUser = user ?? fetchedUser;

    if (isLoading && shouldFetch) {
        return (
            <ModalContainer onClose={onClose} label={'User Details'} icon={faUser} gap={'4'}>
                <Centered>
                    <p className="text-gray-600 text-sm tracking-wide">Loading user data...</p>
                </Centered>
            </ModalContainer>
        );
    }

    if (isError || !resolvedUser) {
        return (
            <ModalContainer onClose={onClose} label={'User Details'} icon={faUser} gap={'4'}>
                <Centered>
                    <p className="text-red-600 text-sm tracking-wide">
                        Failed to load user data. Please try again.
                    </p>
                </Centered>
            </ModalContainer>
        );
    }

    return (
        <ModalContainer
            onClose={onClose}
            label={'User Details'}
            icon={faUser}
            gap={'4'}
            footer={
                onEdit && (
                    <div className="flex justify-end gap-4">
                        <Button.Primary onClick={onEdit}>
                            <FontAwesomeIcon icon={faEdit} className={'h-4 w-4'} />
                            Edit User
                        </Button.Primary>
                    </div>
                )
            }>
            <form>
                <Column>
                    <Card
                        className={
                            'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative'
                        }>
                        <Container className={`p-4`}>
                            <Column className={'items-center'}>
                                <UserAvatar user={resolvedUser} size={'lg'} />
                                <Column className={'items-center'} gap={'0'}>
                                    <h4 className="text-lg font-semibold text-white tracking-tight">
                                        {resolvedUser.firstName} {resolvedUser.lastName}
                                    </h4>
                                    <span className="text-sm text-blue-100">
                                        @{resolvedUser.userName}
                                    </span>
                                </Column>
                                <Row>
                                    <Badge
                                        size={'sm'}
                                        text={capitalizeFirstLetter(resolvedUser.role)}
                                        icon={faShieldAlt}
                                        color={getUserRoleColor(resolvedUser.role)}
                                    />
                                    <Badge
                                        size={'sm'}
                                        text={capitalizeFirstLetter(resolvedUser.status)}
                                        icon={getUserStatusIcon(resolvedUser.status)}
                                        color={getUserStatusColor(resolvedUser.status)}
                                    />
                                </Row>
                            </Column>
                        </Container>
                    </Card>

                    <Card className={'bg-gradient-to-br from-gray-100 to-gray-200 px-6 pb-6 py-3'}>
                        <Column>
                            <h5 className="text-sm font-semibold text-gray-900">
                                Personal Information
                            </h5>

                            <Container className="grid grid-cols-2 gap-4">
                                <Column gap={'2'}>
                                    <Label>First Name</Label>
                                    <Container bordered className={'bg-white px-4 py-3'}>
                                        <p className="text-gray-900 text-sm">
                                            {resolvedUser.firstName}
                                        </p>
                                    </Container>
                                </Column>

                                <Column gap={'2'}>
                                    <Label>Last Name</Label>
                                    <Container bordered className={'bg-white px-4 py-3'}>
                                        <p className="text-gray-900 text-sm">
                                            {resolvedUser.lastName}
                                        </p>
                                    </Container>
                                </Column>

                                <Column gap={'2'} className={'sm:col-span-2'}>
                                    <Label>Username</Label>
                                    <Container bordered className={'bg-white px-4 py-3'}>
                                        <p className="text-gray-900 text-sm">
                                            @{resolvedUser.userName}
                                        </p>
                                    </Container>
                                </Column>
                            </Container>
                        </Column>
                    </Card>

                    <Card
                        className={
                            'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200 px-6 pb-6 py-3'
                        }>
                        <Column>
                            <h5 className="text-sm font-semibold text-gray-900">
                                Contact Information
                            </h5>

                            <Container className="grid grid-cols-2 gap-4">
                                <Column gap={'2'}>
                                    <Label>Email Address</Label>
                                    <Container bordered className={'bg-white px-4 py-3'}>
                                        <Row gap={'2'}>
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                                className={'text-green-500 w-4 h-4'}
                                            />
                                            <p className="text-gray-900 text-sm">
                                                {resolvedUser.email}
                                            </p>
                                        </Row>
                                    </Container>
                                </Column>

                                <Column gap={'2'}>
                                    <Label>Phone Number</Label>
                                    <Container bordered className={'bg-white px-4 py-3'}>
                                        <Row gap={'2'}>
                                            <FontAwesomeIcon
                                                icon={faPhone}
                                                className={'text-green-500 w-4 h-4'}
                                            />
                                            <p className="text-gray-900 text-sm">
                                                {resolvedUser.phoneNumber || 'Not provided'}
                                            </p>
                                        </Row>
                                    </Container>
                                </Column>
                            </Container>
                        </Column>
                    </Card>
                </Column>
            </form>
        </ModalContainer>
    );
};

export default UserDetailsModal;
