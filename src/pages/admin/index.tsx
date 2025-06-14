import MainPageLayout from '@components/layout/MainPageLayout';
import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import FeatureCard from '@components/ui/container/FeatureCard';
import StatCard from '@components/ui/container/StatCard';
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
                <Column gap={'16'}>
                    <Card>
                        <Container
                            easeIn
                            isVisible={isVisible}
                            className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                            <Column className={'items-center'}>
                                <Column className={'items-center'}>
                                    <FontAwesomeIcon
                                        icon={faUserShield}
                                        className={'text-blue-600'}
                                        size={'3x'}
                                    />
                                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                                        Admin <span className="text-blue-600">Dashboard</span>
                                    </h1>
                                </Column>
                                <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto text-center">
                                    Comprehensive platform administration and management tools.
                                    Monitor, configure, and optimize your Custify instance.
                                </p>
                            </Column>
                        </Container>
                    </Card>

                    <Column gap={'8'} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <h2 className="text-3xl font-semibold text-gray-900 text-center">
                            System Overview
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {adminQuickStats.map((quickStat) => (
                                <StatCard key={quickStat.value} easeIn isVisible={isVisible}>
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
                                </StatCard>
                            ))}
                        </div>
                    </Column>

                    <Column gap={'8'} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <Column className={'items-center text-center'}>
                            <h2 className="text-3xl font-semibold text-gray-900">
                                Administration Tools
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Access powerful administrative features to manage users, monitor
                                system performance, and configure platform settings.
                            </p>
                        </Column>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {adminFeatures.map((feature) => (
                                <FeatureCard
                                    key={feature.id}
                                    easeIn
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
                                </FeatureCard>
                            ))}
                        </div>
                    </Column>
                </Column>
            </MainPageLayout>
        </>
    );
};

export default AdminLandingPage;
