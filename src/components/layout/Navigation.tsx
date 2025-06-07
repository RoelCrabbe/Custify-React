import Button from '@components/ui/Button';
import { ROUTES } from '@config/routes';
import { getUserNavItems } from '@config/userConfig';
import { useNavigationState } from '@hooks/useNavigationState';
import Link from 'next/link';
import { memo } from 'react';

const userNavItems = getUserNavItems();

const Navigation: React.FC = () => {
    const {
        isLoading,
        isAuthenticated,
        isOnAuthPage,
        isOnLoginPage,
        userIsAdmin,
        getLinkClassName,
        handleLogout,
    } = useNavigationState();

    if (isLoading) {
        return (
            <>
                <header className="navigation">
                    <div className="navigation__wrapper">
                        <div className="navigation__content">
                            <Link href={ROUTES.HOME}>
                                <h1>Custify</h1>
                            </Link>
                        </div>
                    </div>
                </header>
            </>
        );
    }

    return (
        <>
            <header className="navigation">
                <div className="navigation__wrapper">
                    <div className="navigation__content">
                        <Link href={ROUTES.HOME}>
                            <h1>Custify</h1>
                        </Link>

                        {isAuthenticated && (
                            <nav>
                                <ul>
                                    {userNavItems.map((feature) => (
                                        <li key={feature.id}>
                                            <Link
                                                href={feature.href}
                                                className={getLinkClassName(feature.href)}>
                                                {feature.label}
                                            </Link>
                                        </li>
                                    ))}

                                    {userIsAdmin && (
                                        <li key="admin">
                                            <Link
                                                href={ROUTES.ADMIN.DASHBOARD}
                                                className={getLinkClassName(
                                                    ROUTES.ADMIN.DASHBOARD,
                                                )}>
                                                Admin Panel
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        )}

                        <div className="navigation__actions">
                            {isAuthenticated ? (
                                <Button.Danger onClick={handleLogout}>Logout</Button.Danger>
                            ) : isOnAuthPage ? (
                                <Link
                                    href={isOnLoginPage ? ROUTES.AUTH.REGISTER : ROUTES.AUTH.LOGIN}
                                    className="button-base button-primary button-md">
                                    {isOnLoginPage ? 'Sign Up' : 'Login'}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={ROUTES.AUTH.LOGIN}
                                        className="button-base button-secondary button-md">
                                        Login
                                    </Link>
                                    <Link
                                        href={ROUTES.AUTH.REGISTER}
                                        className="button-base button-primary button-md">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default memo(Navigation);
