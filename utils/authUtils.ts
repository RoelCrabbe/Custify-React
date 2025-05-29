export const getLoggedInUser = () => {
    if (typeof window === 'undefined') return null;

    const user = localStorage.getItem('loggedInUser');
    if (user) {
        try {
            return JSON.parse(user);
        } catch (error) {
            console.error('Failed to parse loggedInUser:', error);
        }
    }
    return null;
};

export const getToken = () => {
    const user = getLoggedInUser();
    return user ? user.token || null : null;
};

export const getFullName = () => {
    const user = getLoggedInUser();
    return user ? user.fullname || null : null;
};

export const getUserName = () => {
    const user = getLoggedInUser();
    return user ? user.username || null : null;
};
