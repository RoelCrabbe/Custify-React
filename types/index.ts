export type User = {
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role: string;
};

export type ErrorLabelMessage = {
    label: string;
    message: string;
};

export type IdName = {
    id?: number;
    name: string;
};

export type CssOptionType = {
    value: number;
    label: string;
};
