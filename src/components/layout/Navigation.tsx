import Button from '@components/ui/Button';
import { getUserNavItems } from '@config/userConfig';
import { isAuthPage } from '@lib/utils/auth';
import { useCurrentUser } from '@provider/UserProvider';
import { isAdmin } from '@types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const userNavItems = getUserNavItems();

const Navigation: React.FC = () => {
    const router = useRouter();
    const currentUser = useCurrentUser();

    const handleLogout = () => {
        router.push('/logout');
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
                        <Link href="/">
                            <h1>Custify</h1>
                        </Link>

                        {currentUser.isLoggedIn && (
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
                                                href="/admin"
                                                className={getLinkClassName(
                                                    router.pathname === '/admin',
                                                )}>
                                                Admin Panel
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        )}

                        <div className="navigation__actions">
                            {currentUser.isLoggedIn ? (
                                <Button.Danger onClick={handleLogout}>Logout</Button.Danger>
                            ) : (
                                <>
                                    {isAuthPage(router.pathname) ? (
                                        <Link
                                            href={
                                                router.pathname === '/login'
                                                    ? '/register'
                                                    : '/login'
                                            }
                                            className="button-base button-primary button-md">
                                            {router.pathname === '/login' ? 'Sign Up' : 'Login'}
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="button-base button-secondary button-md">
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
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
