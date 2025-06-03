import { useCurrentUser } from '@provider/UserProvider';
import { Role } from '@types';
import { getUserRole } from '@utils/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {
    const router = useRouter();
    const currentUser = useCurrentUser();

    const handleLogout = () => {
        router.push('/logout');
    };

    const getLinkClassName = (isActive: boolean) => {
        let classes = 'nav-link';
        if (isActive) classes += ' nav-link-active';
        return classes;
    };

    const isAuthPage = router.pathname === '/login' || router.pathname === '/register';
    const isAdmin = getUserRole(currentUser.getValue()) === Role.ADMIN;

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
                                <Link
                                    href="/"
                                    className={getLinkClassName(router.pathname === '/')}>
                                    Dashboard
                                </Link>
                                <Link
                                    href="/customers"
                                    className={getLinkClassName(router.pathname === '/customers')}>
                                    Customers
                                </Link>
                                <Link
                                    href="/orders"
                                    className={getLinkClassName(router.pathname === '/orders')}>
                                    Orders
                                </Link>
                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        className={getLinkClassName(router.pathname === '/admin')}>
                                        Admin Panel
                                    </Link>
                                )}
                                <Link
                                    href="/settings"
                                    className={getLinkClassName(router.pathname === '/settings')}>
                                    Settings
                                </Link>
                            </nav>
                        )}

                        <div className="navigation__actions">
                            {currentUser.isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="nav-button nav-button__logout">
                                    Logout
                                </button>
                            ) : (
                                <>
                                    {isAuthPage ? (
                                        <Link
                                            href={
                                                router.pathname === '/login'
                                                    ? '/register'
                                                    : '/login'
                                            }
                                            className="nav-button nav-button__primary">
                                            {router.pathname === '/login' ? 'Sign Up' : 'Login'}
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="nav-button nav-button__secondary">
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="nav-button nav-button__primary">
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
