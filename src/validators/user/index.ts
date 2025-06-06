export const validateFirstName = (name: string | null) => {
    if (!name?.trim()) return 'First name is required.';
    return null;
};

export const validateLastName = (name: string | null) => {
    if (!name?.trim()) return 'Last name is required.';
    return null;
};

export const validateEmail = (email: string | null) => {
    if (!email?.trim()) return 'Email is required.';
    return null;
};

export const validatePhoneNumber = (phoneNumber: string | null) => {
    if (phoneNumber && !phoneNumber?.trim()) return "Phone number can't be empty.";
    return null;
};

export const validateUserName = (userName: string | null) => {
    if (!userName?.trim()) return 'Username is required.';
    return null;
};

export const validatePassWord = (passWord: string | null) => {
    if (!passWord?.trim()) return 'Password is required.';
    return null;
};

export const validateRole = (role: string | null) => {
    if (!role?.trim()) return 'Role is required.';
    return null;
};

export const validateStatus = (status: string | null) => {
    if (!status?.trim()) return 'Status is required.';
    return null;
};
