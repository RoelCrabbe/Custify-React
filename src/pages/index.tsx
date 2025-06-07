import MainPageLayout from '@components/layout/MainPageLayout';
import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import { ROUTES } from '@config/routes';
import { getUserFeatures } from '@config/userConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCurrentUser } from '@provider/UserProvider';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const userFeatures = getUserFeatures();

const Home: React.FC = () => {
    const router = useRouter();
    const currentUser = useCurrentUser();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <MainPageLayout pageName={'Home'}>
                <div className="flex flex-col gap-16">
                    <FormContainer.Card>
                        <FormContainer
                            easeIn
                            isVisible={isVisible}
                            className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                            <FormContainer.Column className="items-center">
                                <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                                    Welcome to <span className="text-blue-600">Custify</span>
                                </h1>
                                <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto text-center">
                                    The professional customer management platform that streamlines
                                    your business operations and enhances customer relationships.
                                </p>
                                {!currentUser.isLoggedIn && (
                                    <Button.Primary
                                        onClick={() => router.push(ROUTES.AUTH.REGISTER)}
                                        size="lg">
                                        Get Started
                                    </Button.Primary>
                                )}
                            </FormContainer.Column>
                        </FormContainer>
                    </FormContainer.Card>

                    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <h2 className="text-3xl font-semibold text-gray-900">
                                Everything you need to manage customers
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Custify provides all the tools and features necessary to build
                                stronger customer relationships and grow your business.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userFeatures.map((feature) => (
                                <FormContainer.FeatureCard
                                    key={feature.id}
                                    isVisible={isVisible}
                                    className={'!cursor-default'}>
                                    <span className="text-blue-600">
                                        <FontAwesomeIcon icon={feature.icon} size={'xl'} />
                                    </span>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </FormContainer.FeatureCard>
                            ))}
                        </div>
                    </div>
                </div>
            </MainPageLayout>
        </>
    );
};

export default Home;
