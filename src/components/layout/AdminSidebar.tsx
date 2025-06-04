import FormContainer from '@components/ui/FormContainer';
import { getAdminNavItems } from '@config/adminConfig';
import { faChevronRight, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const adminNavItems = getAdminNavItems();

const AdminSidebar: React.FC = () => {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const getBarClassName = () => {
        return `admin-sidebar ${isCollapsed ? 'admin-sidebar--collapsed' : ''}`;
    };

    const getHeaderClassName = () => {
        return `admin-sidebar__header ${isCollapsed ? 'admin-sidebar__header--collapsed' : ''}`;
    };

    const getH1ClassName = () => {
        return `admin-sidebar__header-title ${isCollapsed ? 'admin-sidebar__header-title--hidden' : ''}`;
    };

    const getNavClassName = () => {
        return 'admin-nav__list';
    };

    const getLinkClassName = (item: any) => {
        const isActive = router.pathname === item.href;
        return `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`;
    };

    const getSpanClassName = () => {
        return `admin-nav__label ${isCollapsed ? 'admin-nav__label--hidden' : ''}`;
    };

    const getFooterClassName = () => {
        return `admin-sidebar__footer ${isCollapsed ? 'admin-sidebar__footer--collapsed' : ''}`;
    };

    return (
        <>
            <FormContainer.Sidebar className={getBarClassName()}>
                <header className={getHeaderClassName()}>
                    <div className="admin-sidebar__header-icon">
                        <FontAwesomeIcon icon={faTools} />
                    </div>
                    <h1 className={getH1ClassName()}>Admin Panel</h1>
                </header>

                <nav>
                    <ul className={getNavClassName()}>
                        {adminNavItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className={getLinkClassName(item)}>
                                    <div className="admin-nav__icon">
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <span className={getSpanClassName()}>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={getFooterClassName()}>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`button-base button-primary inline-flex items-center justify-center`}>
                        {isCollapsed ? <FontAwesomeIcon icon={faChevronRight} /> : 'Hide'}
                    </button>
                </div>
            </FormContainer.Sidebar>
        </>
    );
};

export default AdminSidebar;
