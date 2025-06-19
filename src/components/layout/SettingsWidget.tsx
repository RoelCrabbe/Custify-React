import { faCog, faMoon, faSun, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@provider/AuthProvider';
import { isAdmin } from '@types';
import { useEffect, useState } from 'react';

const SettingsWidget: React.FC = () => {
    const currentUser = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userMode, setUserMode] = useState(false);

    useEffect(() => {
        const savedDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDark);

        if (isAdmin(currentUser.getValue())) {
            const savedUser = localStorage.getItem('userMode') === 'true';
            setUserMode(savedUser);
        }
    }, [currentUser]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const toggleUserMode = () => {
        setUserMode((prev) => {
            const next = !prev;
            localStorage.setItem('userMode', next.toString());
            return next;
        });
    };

    const handleToggle = () => setIsOpen((prev) => !prev);

    return (
        <div className="settings-widget">
            <button
                onClick={handleToggle}
                aria-label={isOpen ? 'Close Settings' : 'Open Settings'}
                className="settings-button">
                <FontAwesomeIcon icon={isOpen ? faTimes : faCog} className={'settings-icon'} />
            </button>

            {isOpen && (
                <div className="settings-panel">
                    <div className="settings-card">
                        <div className="settings-header">
                            <h3 className="settings-title">Settings</h3>
                        </div>

                        <div className="settings-content">
                            <div className="settings-option">
                                <div className="settings-option-info">
                                    <div className="settings-option-icon">
                                        <FontAwesomeIcon
                                            icon={darkMode ? faSun : faMoon}
                                            className="settings-option-icon-size"
                                        />
                                    </div>
                                    <span className="settings-option-label">
                                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                                    </span>
                                </div>

                                <button
                                    onClick={toggleDarkMode}
                                    className={`toggle-switch toggle-switch-dark ${
                                        darkMode
                                            ? 'toggle-switch-dark-active'
                                            : 'toggle-switch-dark-inactive'
                                    }`}>
                                    <span
                                        className={`toggle-circle ${
                                            darkMode
                                                ? 'toggle-circle-active'
                                                : 'toggle-circle-inactive'
                                        }`}
                                    />
                                </button>
                            </div>

                            {isAdmin(currentUser.getValue()) && (
                                <div className="settings-option">
                                    <div className="settings-option-info">
                                        <div className="settings-option-icon">
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                className={'settings-option-icon-size'}
                                            />
                                        </div>
                                        <span className="settings-option-label">User Mode</span>
                                    </div>

                                    <button
                                        onClick={toggleUserMode}
                                        className={`toggle-switch toggle-switch-user ${
                                            userMode
                                                ? 'toggle-switch-user-active'
                                                : 'toggle-switch-user-inactive'
                                        }`}>
                                        <span
                                            className={`toggle-circle ${
                                                userMode
                                                    ? 'toggle-circle-active'
                                                    : 'toggle-circle-inactive'
                                            }`}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {isOpen && <div className="settings-backdrop" onClick={handleToggle} />}
        </div>
    );
};

export default SettingsWidget;
