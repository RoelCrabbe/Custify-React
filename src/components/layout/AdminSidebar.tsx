import Button from '@components/ui/Button';
import SideBar from '@components/ui/container/SideBar';
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

    const getH2ClassName = () => {
        return `admin-sidebar__header-title ${isCollapsed ? 'admin-sidebar__header-title--hidden' : ''}`;
    };

    const getNavClassName = () => {
        return 'admin-nav__list';
    };

    const getLinkClassName = (item: any) => {
        const isCurrent = router.pathname === item.href;
        return `admin-nav__link ${isCurrent ? 'admin-nav__link--active' : ''}`;
    };

    const getSpanClassName = () => {
        return `admin-nav__label ${isCollapsed ? 'admin-nav__label--hidden' : ''}`;
    };

    const getFooterClassName = () => {
        return `admin-sidebar__footer ${isCollapsed ? 'admin-sidebar__footer--collapsed' : ''}`;
    };

    return (
        <SideBar className={getBarClassName()}>
            <header className={getHeaderClassName()}>
                <div className="admin-sidebar__header-icon">
                    <FontAwesomeIcon icon={faTools} />
                </div>
                <h2 className={getH2ClassName()}>Admin Panel</h2>
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
                <Button.Primary onClick={() => setIsCollapsed(!isCollapsed)} className={'w-full'}>
                    {isCollapsed ? <FontAwesomeIcon icon={faChevronRight} /> : 'Hide'}
                </Button.Primary>
            </div>
        </SideBar>
    );
};

export default AdminSidebar;
