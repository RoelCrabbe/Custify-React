export * from './user/role';
export * from './user/status';
export * from './user/user';

export type LabelMessage = {
    label: string;
    message: string;
    type: 'error' | 'success' | 'info';
};

export type IdName = {
    id?: number;
    name: string;
};

export type CssOptionType = {
    value: number;
    label: string;
};
