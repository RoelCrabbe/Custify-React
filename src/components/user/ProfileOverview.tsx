import Button from '@components/ui/Button';
import Badge from '@components/ui/container/Badge';
import Card from '@components/ui/container/Card';
import Centered from '@components/ui/container/Centered';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import Row from '@components/ui/container/Row';
import Label from '@components/ui/content/Label';
import UserAvatar from '@components/ui/UserAvatar';
import {
    faAddressCard,
    faEdit,
    faEnvelope,
    faIdCard,
    faPhone,
    faShieldAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { getUserRoleColor, getUserStatusColor, getUserStatusIcon, User } from '@types';
import { useEffect, useState } from 'react';

interface Props {
    user: User;
    onEdit: () => void;
}

const ProfileOverview: React.FC<Props> = ({ user, onEdit }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <Column gap={'8'}>
            <Card className={'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative'}>
                <div className="absolute bottom-6 right-6">
                    <Button.Ghost
                        onClick={onEdit}
                        size={'sm'}
                        className="text-white hover:text-blue-100 hover:bg-white/10 border-white/20 hover:border-white/30 active:bg-white/20 active:text-white focus:bg-white/10 focus:text-white focus:ring-white/20">
                        <Row gap={'2'}>
                            <FontAwesomeIcon icon={faEdit} />
                            Edit Profile
                        </Row>
                    </Button.Ghost>
                </div>

                <Container
                    easeIn
                    isVisible={isVisible}
                    className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative`}>
                    <Column className={'items-center'}>
                        <UserAvatar user={user} size={'xxl'} />
                        <Column className={'items-center'}>
                            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                                {user.firstName} {user.lastName}
                            </h1>
                            <span className="text-lg text-blue-100">@{user.userName}</span>
                        </Column>
                        <Row>
                            <Badge
                                size={'md'}
                                text={capitalizeFirstLetter(user.role)}
                                icon={faShieldAlt}
                                color={getUserRoleColor(user.role)}
                            />
                            <Badge
                                size={'md'}
                                text={capitalizeFirstLetter(user.status)}
                                icon={getUserStatusIcon(user.status)}
                                color={getUserStatusColor(user.status)}
                            />
                        </Row>
                    </Column>
                </Container>
            </Card>

            <Column gap={'8'} className="max-w-7xl mx-auto w-full">
                <Container
                    easeIn
                    isVisible={isVisible}
                    className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    <Column gap={'6'} className={'xl:col-span-2'}>
                        <Card className={'bg-gradient-to-br from-gray-100 to-gray-200 p-6'}>
                            <Column>
                                <Row>
                                    <Centered className={'w-10 h-10 bg-blue-200 rounded-lg'}>
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className={'w-5 h-5 text-blue-600'}
                                        />
                                    </Centered>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Personal Information
                                    </h3>
                                </Row>

                                <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <Column gap={'2'}>
                                        <Label>First Name</Label>
                                        <Container bordered className={'bg-white px-4 py-3'}>
                                            <p className="text-gray-900 font-medium">
                                                {user.firstName}
                                            </p>
                                        </Container>
                                    </Column>

                                    <Column gap={'2'}>
                                        <Label>Last Name</Label>
                                        <Container bordered className={'bg-white px-4 py-3'}>
                                            <p className="text-gray-900 font-medium">
                                                {user.lastName}
                                            </p>
                                        </Container>
                                    </Column>

                                    <Column gap={'2'} className={'sm:col-span-2'}>
                                        <Label>Username</Label>
                                        <Container bordered className={'bg-white px-4 py-3'}>
                                            <p className="text-gray-900 font-medium">
                                                @{user.userName}
                                            </p>
                                        </Container>
                                    </Column>

                                    <Column gap={'2'} className={'sm:col-span-2'}>
                                        <Label>Password</Label>
                                        <Container bordered className={'bg-white px-4 py-3'}>
                                            <p className="text-gray-900 font-medium">
                                                ***************
                                            </p>
                                        </Container>
                                    </Column>
                                </Container>
                            </Column>
                        </Card>

                        <Card
                            className={
                                'bg-gradient-to-br from-green-100 to-emerald-100 p-6 border-green-200'
                            }>
                            <Column>
                                <Row>
                                    <Centered className={'w-10 h-10 bg-green-200 rounded-lg'}>
                                        <FontAwesomeIcon
                                            icon={faAddressCard}
                                            className={'w-5 h-5 text-green-600'}
                                        />
                                    </Centered>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Contact Information
                                    </h3>
                                </Row>

                                <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <Column gap={'2'}>
                                        <Label>Email Address</Label>
                                        <Container bordered className={'bg-white px-4 py-3'}>
                                            <Row gap={'2'}>
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    className={'text-green-500 w-4 h-4'}
                                                />
                                                <p className="text-gray-900 font-medium">
                                                    {user.email}
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
                                                <p className="text-gray-900 font-medium">
                                                    {user.phoneNumber || 'Not provided'}
                                                </p>
                                            </Row>
                                        </Container>
                                    </Column>
                                </Container>
                            </Column>
                        </Card>
                    </Column>

                    <Column gap={'6'}>
                        <Card
                            className={
                                'bg-gradient-to-br from-purple-100 to-indigo-100 p-6 border-purple-200'
                            }>
                            <Column>
                                <Row>
                                    <Centered className={'w-10 h-10 bg-purple-200 rounded-lg'}>
                                        <FontAwesomeIcon
                                            icon={faIdCard}
                                            className={'w-5 h-5 text-purple-600'}
                                        />
                                    </Centered>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Account Details
                                    </h3>
                                </Row>

                                <Column gap={'2'}>
                                    <Label>Role</Label>
                                    <Badge
                                        size={'md'}
                                        text={capitalizeFirstLetter(user.role)}
                                        icon={faShieldAlt}
                                        color={getUserRoleColor(user.role)}
                                    />
                                </Column>

                                <Column gap={'2'}>
                                    <Label>Status</Label>
                                    <Badge
                                        size={'md'}
                                        text={capitalizeFirstLetter(user.status)}
                                        icon={getUserStatusIcon(user.status)}
                                        color={getUserStatusColor(user.status)}
                                    />
                                </Column>
                            </Column>
                        </Card>
                    </Column>
                </Container>
            </Column>
        </Column>
    );
};

export default ProfileOverview;
