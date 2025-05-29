import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Navigation: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        toast.success('You logged out successfully!');
        setTimeout(() => {
            router.push('/');
        }, 2000);
    };

    const getLinkClassName = (isActive: boolean) => {
        let classes = 'nav-link';
        if (isActive) classes += ' nav-link-active';
        return classes;
    };

    return (
        <header className="navigation-container">
            <div className="navigation-wrapper">
                <div className="navigation-content">
                    <div className="navigation-brand">
                        <h1 className="navigation-title">Custify</h1>
                    </div>

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
                        <Link
                            href="/settings"
                            className={getLinkClassName(router.pathname === '/settings')}>
                            Settings
                        </Link>
                    </nav>

                    <div className="navigation-actions">
                        <button onClick={handleLogout} className="nav-button nav-button-logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
