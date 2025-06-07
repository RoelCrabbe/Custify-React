import Button from '@components/ui/Button';
import { isAuthPage, ROUTES } from '@config/routes';
import { getUserNavItems } from '@config/userConfig';
import { useAuth } from '@provider/AuthProvider';
import { isAdmin } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const userNavItems = getUserNavItems();

const Navigation: React.FC = () => {
    const router = useRouter();
    const currentUser = useAuth();

    const handleLogout = () => {
        router.push(ROUTES.AUTH.LOGOUT);
    };

    const getLinkClassName = (isCurrent: boolean) => {
        let classes = 'nav-link';
        if (isCurrent) classes += ' nav-link-active';
        return classes;
    };

    return (
        <>
            <header className="navigation">
                <div className="navigation__wrapper">
                    <div className="navigation__content">
                        <Link href={ROUTES.HOME}>
                            <h1>Custify</h1>
                        </Link>

                        {currentUser.isAuthenticated && (
                            <nav>
                                <ul>
                                    {userNavItems.map((feature) => (
                                        <li key={feature.id}>
                                            <Link
                                                href={feature.href}
                                                className={getLinkClassName(
                                                    router.pathname === feature.href,
                                                )}>
                                                {feature.label}
                                            </Link>
                                        </li>
                                    ))}

                                    {isAdmin(currentUser.getValue()) && (
                                        <li key={'admin'}>
                                            <Link
                                                href={ROUTES.ADMIN.DASHBOARD}
                                                className={getLinkClassName(
                                                    router.pathname === ROUTES.ADMIN.DASHBOARD,
                                                )}>
                                                Admin Panel
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        )}

                        <div className="navigation__actions">
                            {currentUser.isAuthenticated ? (
                                <Button.Danger onClick={handleLogout}>Logout</Button.Danger>
                            ) : (
                                <>
                                    {isAuthPage(router.pathname) ? (
                                        <Link
                                            href={
                                                router.pathname === ROUTES.AUTH.LOGIN
                                                    ? ROUTES.AUTH.REGISTER
                                                    : ROUTES.AUTH.LOGIN
                                            }
                                            className="button-base button-primary button-md">
                                            {router.pathname === ROUTES.AUTH.LOGIN
                                                ? 'Sign Up'
                                                : 'Login'}
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navigation;
