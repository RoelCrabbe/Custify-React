export * from './user/role';
export * from './user/status';
export * from './user/user';

export * from './errorLog/errorLog';
export * from './errorLog/method';
export * from './errorLog/severity';
export * from './errorLog/status';
export * from './errorLog/type';

export * from './notification/category';
export * from './notification/notification';
export * from './notification/priority';
export * from './notification/status';

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
