export * from './user/index';
export * from './user/role';
export * from './user/status';

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
