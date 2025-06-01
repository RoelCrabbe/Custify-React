import FormContainer from '@components/ui/FormContainer';
import {
    faBox,
    faChartBar,
    faChartLine,
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
import { useState } from 'react';

const AdminSidebar: React.FC = () => {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        router.push('/logout');
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
                            <button
                                type="button"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="admin-collapse-btn">
                                <FontAwesomeIcon icon={faTools} className="admin-brand-icon" />
                            </button>
                            <h2 className="admin-brand-title">Admin Panel</h2>
                        </div>
                    </>
                )}
            </div>

            <nav className="admin-nav">
                <ul className={`admin-nav-list ${isCollapsed ? 'items-center' : ''}`}>
                    {adminNavItems.map((item) => (
                        <li key={item.href} className="w-full">
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
