import MainLayout from '@components/layout/MainLayout';
import Button from '@components/shared/Button';
import FormContainer from '@components/shared/FormContainer';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: '👥',
            title: 'Customer Management',
            description:
                'Organize and track all your customer information in one centralized platform with advanced search and filtering.',
        },
        {
            icon: '📊',
            title: 'Order Tracking',
            description:
                'Monitor orders from creation to completion with real-time status updates and comprehensive reporting.',
        },
        {
            icon: '🔧',
            title: 'Customizable Settings',
            description:
                'Tailor the platform to your business needs with flexible configuration options and personalized workflows.',
        },
        {
            icon: '📈',
            title: 'Analytics & Insights',
            description:
                'Get valuable business insights with detailed analytics, trend analysis, and performance metrics.',
        },
        {
            icon: '🔒',
            title: 'Secure & Reliable',
            description:
                'Enterprise-grade security with data encryption, regular backups, and 99.9% uptime guarantee.',
        },
        {
            icon: '⚡',
            title: 'Lightning Fast',
            description:
                'Built for speed with optimized performance, instant search, and seamless user experience.',
        },
    ];

    return (
        <MainLayout pageName={'Home'}>
            <div className="flex flex-col gap-16">
                <FormContainer hasBorder>
                    <FormContainer
                        easeIn
                        isVisible={isVisible}
                        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                        <FormContainer isColumn gap={'4'} className="items-center">
                            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                                Welcome to <span className="text-blue-600">Custify</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
                                The professional customer management platform that streamlines your
                                business operations and enhances customer relationships.
                            </p>
                            <div className="flex justify-center w-36">
                                <Button onClick={() => {}}>Get Started</Button>
                            </div>
                        </FormContainer>
                    </FormContainer>
                </FormContainer>

                <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Everything you need to manage customers
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Custify provides all the tools and features necessary to build stronger
                            customer relationships and grow your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <FormContainer
                                key={index}
                                hasBorder
                                easeIn
                                isVisible={isVisible}
                                isColumn
                                gap={'4'}
                                className={'p-6 hover:shadow-sm'}>
                                <div className="text-2xl">{feature.icon}</div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </FormContainer>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
