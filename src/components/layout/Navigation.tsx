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
            <header className="navigation-container">
                <div className="navigation-wrapper">
                    <div className="navigation-content">
                        <div className="navigation-brand">
                            <Link href="/">
                                <h1 className="navigation-title">Custify</h1>
                            </Link>
                        </div>

                        {currentUser.isLoggedIn && (
                            <nav className="navigation-menu">
                                <Link
                                    href="/dashboard"
                                    className={getLinkClassName(router.pathname === '/dashboard')}>
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

                        <div className="navigation-actions">
                            {currentUser.isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="nav-button nav-button-logout">
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
                                            className="nav-button nav-button-primary">
                                            {router.pathname === '/login' ? 'Sign Up' : 'Login'}
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="nav-button nav-button-secondary">
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="nav-button nav-button-primary">
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
