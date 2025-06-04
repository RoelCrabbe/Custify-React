import MainPageLayout from '@components/layout/MainPageLayout';
import FormContainer from '@components/ui/FormContainer';
import { faChartLine, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAdminFeatures } from 'config/adminConfig';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const adminFeatures = getAdminFeatures();

const AdminLandingPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const quickStats = [
        { label: 'Total Users', value: '2,847', change: '+12%', trend: 'up' },
        { label: 'Active Sessions', value: '1,234', change: '+5%', trend: 'up' },
        { label: 'System Uptime', value: '99.9%', change: '0%', trend: 'stable' },
        { label: 'Pending Issues', value: '3', change: '-2', trend: 'down' },
    ];

    return (
        <MainPageLayout pageName={'Admin Panel'}>
            <div className="flex flex-col gap-16">
                {/* Header Section */}
                <FormContainer hasBorder>
                    <FormContainer
                        easeIn
                        isVisible={isVisible}
                        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                        <FormContainer isColumn gap={'4'} className="items-center">
                            <div className="flex items-center gap-3 mb-2">
                                <FontAwesomeIcon
                                    icon={faUserShield}
                                    className="text-blue-600"
                                    size="2x"
                                />
                                <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                                    Admin <span className="text-blue-600">Dashboard</span>
                                </h1>
                            </div>
                            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto text-center">
                                Comprehensive platform administration and management tools. Monitor,
                                configure, and optimize your Custify instance.
                            </p>
                        </FormContainer>
                    </FormContainer>
                </FormContainer>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Quick Stats */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                            System Overview
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickStats.map((stat, index) => (
                                <FormContainer
                                    key={index}
                                    hasBorder
                                    easeIn
                                    isVisible={isVisible}
                                    className="p-6 text-center hover:shadow-sm">
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                                    <div
                                        className={`text-xs font-medium ${
                                            stat.trend === 'up'
                                                ? 'text-green-600'
                                                : stat.trend === 'down'
                                                  ? 'text-red-600'
                                                  : 'text-gray-500'
                                        }`}>
                                        {stat.change}
                                    </div>
                                </FormContainer>
                            ))}
                        </div>
                    </div>

                    {/* Admin Features Grid */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <h2 className="text-3xl font-semibold text-gray-900">
                                Administration Tools
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Access powerful administrative features to manage users, monitor
                                system performance, and configure platform settings.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {adminFeatures.map((feature) => (
                                <FormContainer
                                    key={feature.id}
                                    hasBorder
                                    easeIn
                                    isVisible={isVisible}
                                    isColumn
                                    gap={'4'}
                                    className={'p-6 cursor-pointer'}
                                    onClick={() => router.push(feature.href)}>
                                    <span className="text-blue-600">
                                        <FontAwesomeIcon icon={feature.icon} size={'xl'} />
                                    </span>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                    <div className="flex items-center text-blue-600 text-sm font-medium mt-2">
                                        Access Tool
                                        <FontAwesomeIcon
                                            icon={faChartLine}
                                            className="ml-2"
                                            size="sm"
                                        />
                                    </div>
                                </FormContainer>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainPageLayout>
    );
};

export default AdminLandingPage;
