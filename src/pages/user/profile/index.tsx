import MainPageLayout from '@components/layout/MainPageLayout';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import UserAvatar from '@components/ui/UserAvatar';
import {
    faAddressCard,
    faEnvelope,
    faIdCard,
    faPhone,
    faShieldAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRequireAuth } from '@hooks/useAuthGuard';
import { capitalizeFirstLetter } from '@lib';
import { getUserRoleColor, getUserStatusColor, getUserStatusIcon } from '@types';
import { useEffect, useState } from 'react';

const UserProfilePage: React.FC = () => {
    const { shouldRender, currentUser } = useRequireAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const user = currentUser.getValue();

    return (
        <>
            <MainPageLayout pageName="Profile" isLoading={!shouldRender && !user}>
                {user && (
                    <Column gap={'8'}>
                        <Card
                            className={'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'}>
                            <Container
                                easeIn
                                isVisible={isVisible}
                                className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                                <Column className="items-center">
                                    <UserAvatar user={user} size={'xxl'} />
                                    <Column className={'items-center'}>
                                        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                                            {user.firstName} {user.lastName}
                                        </h1>
                                        <span className="text-lg text-blue-100 max-w-2xl mx-auto text-center">
                                            @{user.userName}
                                        </span>
                                    </Column>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium w-fit ${getUserRoleColor(user.role)}`}>
                                            <FontAwesomeIcon
                                                icon={faShieldAlt}
                                                className={'user-management__icon'}
                                            />
                                            {capitalizeFirstLetter(user.role)}
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium w-fit ${getUserStatusColor(user.status)}`}>
                                            <FontAwesomeIcon
                                                icon={getUserStatusIcon(user.status)}
                                                className={'user-management__icon'}
                                            />
                                            {capitalizeFirstLetter(user.status)}
                                        </span>
                                    </div>
                                </Column>
                            </Container>
                        </Card>

                        <Column gap={'8'} className="max-w-7xl mx-auto w-full">
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                                <section className="xl:col-span-2 space-y-6">
                                    <Card
                                        className={
                                            'bg-gradient-to-br from-gray-100 to-gray-200 p-6'
                                        }>
                                        <Column>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faUser}
                                                        className={'w-5 h-5 text-blue-600'}
                                                    />
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    Personal Information
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                                <Column gap={'2'}>
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        First Name
                                                    </label>
                                                    <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                                                        <p className="text-gray-900 font-medium">
                                                            {user.firstName}
                                                        </p>
                                                    </div>
                                                </Column>

                                                <Column gap={'2'}>
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Last Name
                                                    </label>
                                                    <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                                                        <p className="text-gray-900 font-medium">
                                                            {user.lastName}
                                                        </p>
                                                    </div>
                                                </Column>

                                                <Column gap={'2'} className={'sm:col-span-2'}>
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Username
                                                    </label>
                                                    <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                                                        <p className="text-gray-900 font-medium">
                                                            @{user.userName}
                                                        </p>
                                                    </div>
                                                </Column>
                                            </div>
                                        </Column>
                                    </Card>

                                    <Card
                                        className={
                                            'bg-gradient-to-br from-green-100 to-emerald-100 p-6 border-green-200'
                                        }>
                                        <Column>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faAddressCard}
                                                        className={'w-5 h-5 text-green-600'}
                                                    />
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    Contact Information
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                                <Column gap={'2'}>
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Email Address
                                                    </label>
                                                    <div className="bg-white px-4 py-3 rounded-lg border border-green-200 flex items-center gap-2">
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className={'text-green-500 w-4 h-4'}
                                                        />
                                                        <p className="text-gray-900 font-medium">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </Column>

                                                <Column gap={'2'}>
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Phone Number
                                                    </label>
                                                    <div className="bg-white px-4 py-3 rounded-lg border border-green-200 flex items-center gap-2">
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            className={'text-green-500 w-4 h-4'}
                                                        />
                                                        <p className="text-gray-900 font-medium">
                                                            {user.phoneNumber || 'Not provided'}
                                                        </p>
                                                    </div>
                                                </Column>
                                            </div>
                                        </Column>
                                    </Card>
                                </section>

                                <section className="space-y-6">
                                    <Card
                                        className={
                                            'bg-gradient-to-br from-purple-100 to-indigo-100 p-6 border-purple-200'
                                        }>
                                        <Column>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faIdCard}
                                                        className={'w-5 h-5 text-purple-600'}
                                                    />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Account Details
                                                </h3>
                                            </div>

                                            <Column gap={'2'}>
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Role
                                                </label>
                                                <span
                                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium w-fit ${getUserRoleColor(user.role)}`}>
                                                    <FontAwesomeIcon
                                                        icon={faShieldAlt}
                                                        className={'user-management__icon'}
                                                    />
                                                    {capitalizeFirstLetter(user.role)}
                                                </span>
                                            </Column>

                                            <Column gap={'2'}>
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Status
                                                </label>
                                                <span
                                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium w-fit ${getUserStatusColor(user.status)}`}>
                                                    <FontAwesomeIcon
                                                        icon={getUserStatusIcon(user.status)}
                                                        className={'user-management__icon'}
                                                    />
                                                    {capitalizeFirstLetter(user.status)}
                                                </span>
                                            </Column>
                                        </Column>
                                    </Card>
                                </section>
                            </div>
                        </Column>
                    </Column>
                )}
            </MainPageLayout>
        </>
    );
};

export default UserProfilePage;
