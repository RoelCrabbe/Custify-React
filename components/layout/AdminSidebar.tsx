import FormContainer from '@components/shared/FormContainer';
import {
    faBox,
    faChartBar,
    faChartLine,
    faChevronLeft,
    faCog,
    faFileAlt,
    faLock,
    faShoppingBag,
    faSignOutAlt,
    faTools,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminSidebar: React.FC = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem('authToken');
            setIsLoggedIn(!!token);
        } else {
            setIsLoggedIn(false);
        }
    }, [router.pathname]);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        toast.success('Admin logged out successfully!');
        setTimeout(() => {
            router.push('/admin/login');
        }, 2000);
    };

    const getLinkClassName = (isActive: boolean) => {
        let classes = 'admin-nav-link';
        if (isActive) classes += ' admin-nav-link-active';
        return classes;
    };

    const adminNavItems = [
        {
            href: '/admin/dashboard',
            label: 'Dashboard',
            icon: faChartBar,
        },
        {
            href: '/admin/users',
            label: 'User Management',
            icon: faUsers,
        },
        {
            href: '/admin/orders',
            label: 'Order Management',
            icon: faBox,
        },
        {
            href: '/admin/products',
            label: 'Product Management',
            icon: faShoppingBag,
        },
        {
            href: '/admin/analytics',
            label: 'Analytics',
            icon: faChartLine,
        },
        {
            href: '/admin/reports',
            label: 'Reports',
            icon: faFileAlt,
        },
        {
            href: '/admin/settings',
            label: 'System Settings',
            icon: faCog,
        },
        {
            href: '/admin/permissions',
            label: 'Permissions',
            icon: faLock,
        },
    ];

    if (!isLoggedIn) {
        return null;
    }

    return (
        <FormContainer
            isAside
            hasBorder
            isColumn
            gap={'4'}
            className={`admin-sidebar ${isCollapsed ? 'w-20' : ''}`}>
            <div className={`admin-sidebar-header ${isCollapsed ? 'justify-center' : ''}`}>
                {isCollapsed ? (
                    <button
                        type="button"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="admin-collapse-btn">
                        <FontAwesomeIcon icon={faTools} className="admin-brand-icon" />
                    </button>
                ) : (
                    <>
                        <div className="admin-brand">
                            <FontAwesomeIcon icon={faTools} className="admin-brand-icon" />
                            <h2 className="admin-brand-title">Admin Panel</h2>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="admin-collapse-btn">
                            <FontAwesomeIcon icon={faChevronLeft} className="admin-brand-icon" />
                        </button>
                    </>
                )}
            </div>

            <nav className="admin-nav">
                <ul className={`admin-nav-list ${isCollapsed ? 'items-center' : ''}`}>
                    {adminNavItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={getLinkClassName(router.pathname === item.href)}
                                title={isCollapsed ? item.label : ''}>
                                <FontAwesomeIcon icon={item.icon} className="admin-brand-icon" />
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="admin-sidebar-footer">
                <button
                    onClick={handleLogout}
                    className="admin-logout-btn"
                    title={isCollapsed ? 'Logout' : ''}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="admin-brand-icon text-white" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </FormContainer>
    );
};

export default AdminSidebar;
