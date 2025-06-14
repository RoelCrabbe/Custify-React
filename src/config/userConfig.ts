import { ROUTES } from '@config/routes';
import {
    faBell,
    faBolt,
    faBoxes,
    faChartBar,
    faChartLine,
    faCogs,
    faDatabase,
    faShieldAlt,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

export const userFeatures = [
    {
        id: 'dashboard-overview',
        icon: faChartBar,
        label: 'Dashboard',
        title: 'Dashboard Overview',
        href: ROUTES.HOME,
        description:
            'Get a personalized snapshot of your activity, including recent orders, performance trends, and key updates.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'customer-management',
        icon: faUsers,
        label: 'Customers',
        title: 'Customer Management',
        href: '/customers',
        description:
            'Easily access and manage your customer data with intuitive tools for search, filtering, and segmentation.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'order-tracking',
        icon: faBoxes,
        label: 'Orders',
        title: 'Order Tracking',
        href: '/orders',
        description:
            'Monitor your order progress from placement to delivery with real-time updates and history logs.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'product-catalog',
        icon: faDatabase,
        label: 'Products',
        title: 'Product Catalog',
        href: '/products',
        description:
            'Browse, search, and interact with your product listings, including availability and detailed information.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'analytics-insights',
        icon: faChartLine,
        label: 'Analytics',
        title: 'Analytics & Insights',
        href: '/analytics',
        description:
            'Track key metrics and trends related to your sales, engagement, and customer behavior.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'notifications',
        icon: faBell,
        label: 'Notifications',
        title: 'Smart Notifications',
        href: '/notifications',
        description:
            'Stay updated with personalized alerts about order status, product updates, and platform news.',
        showInNav: false,
        showInFeatures: true,
    },
    {
        id: 'profile',
        icon: faCogs,
        label: 'Profile',
        title: 'Profile Page',
        href: '/user/profile',
        description:
            'Adjust your account settings, preferences, and manage your personal information.',
        showInNav: true,
        showInFeatures: true,
    },
    {
        id: 'security',
        icon: faShieldAlt,
        label: 'Security',
        title: 'Account Security',
        href: '/security',
        description:
            'Protect your account with secure login options, activity monitoring, and recovery tools.',
        showInNav: false,
        showInFeatures: true,
    },
    {
        id: 'performance',
        icon: faBolt,
        label: 'Performance',
        title: 'Optimized Performance',
        href: '/performance',
        description:
            'Enjoy fast load times, responsive design, and seamless interactions across all devices.',
        showInNav: false,
        showInFeatures: true,
    },
];

export const getUserNavItems = () => {
    return userFeatures.filter((item) => item.showInNav);
};

export const getUserFeatures = () => {
    return userFeatures.filter((item) => item.showInFeatures);
};

export const getUserItemById = (id: any) => {
    return userFeatures.find((item) => item.id === id);
};

export const getUserItemByHref = (href: any) => {
    return userFeatures.find((item) => item.href === href);
};
