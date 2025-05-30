export type User = {
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role: string;
};

export type LabelMessage = {
    label: string;
    message: string;
    type: 'error' | 'success';
};

export type IdName = {
    id?: number;
    name: string;
};

export type CssOptionType = {
    value: number;
    label: string;
};
