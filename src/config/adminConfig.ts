import { ROUTES } from '@config/routes';
import {
    faBell,
    faBoxes,
    faChartBar,
    faClipboardList,
    faCog,
    faDatabase,
    faLock,
    faServer,
    faShieldAlt,
    faUsers,
    faUserShield,
} from '@fortawesome/free-solid-svg-icons';

export const adminNavigation = [
    {
        id: 'dashboard',
        icon: faChartBar,
        label: 'Dashboard',
        title: 'Admin Dashboard',
        href: ROUTES.ADMIN.DASHBOARD,
        description: 'Overview of system status and quick access to admin tools.',
        showInNav: true,
        showInFeatures: false,
    },
    {
        id: 'user-management',
        icon: faUsers,
        label: 'User Management',
        title: 'User Management',
        href: ROUTES.ADMIN.USER_MANAGEMENT,
        description: 'Manage user accounts, permissions, and access levels across your platform.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'order-management',
        icon: faBoxes,
        label: 'Order Management',
        title: 'Order Management',
        href: '/admin/order-management',
        description: 'Monitor and manage customer orders, processing status, and fulfillment.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'product-management',
        icon: faDatabase,
        label: 'Product Management',
        title: 'Product Management',
        href: '/admin/product-management',
        description: 'Add, edit, and organize products, inventory, and catalog information.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'analytics',
        icon: faChartBar,
        label: 'Analytics',
        title: 'Analytics Dashboard',
        href: '/admin/analytics',
        description: 'View comprehensive analytics, reports, and business intelligence metrics.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'reports',
        icon: faClipboardList,
        label: 'Reports',
        title: 'Reports',
        href: '/admin/reports',
        description: 'Generate detailed reports on sales, users, and system performance.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'system-settings',
        icon: faCog,
        label: 'System Settings',
        title: 'System Settings',
        href: '/admin/system-settings',
        description: 'Configure platform settings, integrations, and operational parameters.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'permissions',
        icon: faLock,
        label: 'Permissions',
        title: 'Permissions',
        href: '/admin/permissions',
        description: 'Define roles, permissions, and access policies for different user groups.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'security',
        icon: faShieldAlt,
        label: 'Security Center',
        title: 'Security Center',
        href: '/admin/security',
        description: 'Configure security settings, monitor threats, and manage authentication.',
        showInNav: false,
        showInFeatures: true,
    },
    {
        id: 'notifications',
        icon: faBell,
        label: 'Notifications',
        title: 'Notifications',
        href: '/admin/notifications',
        description: 'Manage system notifications, alerts, and communication preferences.',
        showInNav: false,
        showInFeatures: true,
    },
    {
        id: 'audit',
        icon: faUserShield,
        label: 'Audit Logs',
        title: 'Audit Logs',
        href: '/admin/audit',
        description: 'Review system activities, user actions, and compliance reporting.',
        showInNav: false,
        showInFeatures: true,
    },
    {
        id: 'health',
        icon: faServer,
        label: 'System Health',
        title: 'System Health',
        href: '/admin/health',
        description: 'Monitor server performance, uptime, and infrastructure metrics.',
        showInNav: false,
        showInFeatures: true,
    },
];

export const getAdminNavItems = () => {
    return adminNavigation.filter((item) => item.showInNav);
};

export const getAdminFeatures = () => {
    return adminNavigation.filter((item) => item.showInFeatures);
};

export const getAdminItemById = (id: any) => {
    return adminNavigation.find((item) => item.id === id);
};

export const getAdminItemByHref = (href: any) => {
    return adminNavigation.find((item) => item.href === href);
};

export const adminQuickStats = [
    { label: 'Total Users', value: '2,847', change: '+12%', trend: 'up' },
    { label: 'Active Sessions', value: '1,234', change: '+5%', trend: 'up' },
    { label: 'System Uptime', value: '99.9%', change: '0%', trend: 'stable' },
    { label: 'Pending Issues', value: '3', change: '-2', trend: 'down' },
];
