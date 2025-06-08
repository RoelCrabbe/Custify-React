import MainPageLayout from '@components/layout/MainPageLayout';
import FormContainer from '@components/ui/FormContainer';
import { adminQuickStats, getAdminFeatures } from '@config/adminConfig';
import { faChartLine, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRequireAdmin } from '@hooks/useAuthGuard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const adminFeatures = getAdminFeatures();

const AdminLandingPage: React.FC = () => {
    const router = useRouter();
    const { shouldRender, currentUser } = useRequireAdmin();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <MainPageLayout pageName={'Admin Panel'} isLoading={!shouldRender}>
                <div className="flex flex-col gap-16">
                    <FormContainer.Card>
                        <FormContainer
                            easeIn
                            isVisible={isVisible}
                            className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                            <FormContainer.Column className="items-center">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon
                                        icon={faUserShield}
                                        className="text-blue-600"
                                        size="3x"
                                    />
                                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                                        Admin <span className="text-blue-600">Dashboard</span>
                                    </h1>
                                </div>
                                <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto text-center">
                                    Comprehensive platform administration and management tools.
                                    Monitor, configure, and optimize your Custify instance.
                                </p>
                            </FormContainer.Column>
                        </FormContainer>
                    </FormContainer.Card>

                    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <h2 className="text-3xl font-semibold text-gray-900 text-center">
                            System Overview
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {adminQuickStats.map((quickStat) => (
                                <FormContainer.StatCard isVisible={isVisible} key={quickStat.value}>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {quickStat.value}
                                    </h3>
                                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                                        {quickStat.label}
                                    </p>
                                    <div
                                        className={`text-sm font-medium ${
                                            quickStat.trend === 'up'
                                                ? 'text-green-600'
                                                : quickStat.trend === 'down'
                                                  ? 'text-red-600'
                                                  : 'text-gray-500'
                                        }`}>
                                        {quickStat.change}
                                    </div>
                                </FormContainer.StatCard>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                <FormContainer.FeatureCard
                                    isVisible={isVisible}
                                    onClick={() => router.push(feature.href)}>
                                    <span className="text-blue-600">
                                        <FontAwesomeIcon icon={feature.icon} size={'xl'} />
                                    </span>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                                        Access Tool
                                        <FontAwesomeIcon icon={faChartLine} size={'sm'} />
                                    </div>
                                </FormContainer.FeatureCard>
                            ))}
                        </div>
                    </div>
                </div>
            </MainPageLayout>
        </>
    );
};

export default AdminLandingPage;
