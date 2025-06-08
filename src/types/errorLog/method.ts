import {
    faArrowDown,
    faArrowUpRightFromSquare,
    faCode,
    faPen,
    faPlusCircle,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

export const HttpMethod = {
    Get: 'Get',
    Post: 'Post',
    Put: 'Put',
    Patch: 'Patch',
    Delete: 'Delete',
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

export const isValidMethod = (method: unknown): method is HttpMethod => {
    return typeof method === 'string' && Object.values(HttpMethod).includes(method as HttpMethod);
};

export const getHttpMethodColor = (type: HttpMethod): string => {
    switch (type) {
        case HttpMethod.Get:
            return 'bg-sky-100 text-sky-800';
        case HttpMethod.Post:
            return 'bg-green-100 text-green-800';
        case HttpMethod.Put:
            return 'bg-yellow-100 text-yellow-800';
        case HttpMethod.Patch:
            return 'bg-orange-100 text-orange-800';
        case HttpMethod.Delete:
            return 'bg-rose-100 text-rose-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getHttpMethodIcon = (type: HttpMethod) => {
    switch (type) {
        case HttpMethod.Get:
            return faArrowDown;
        case HttpMethod.Post:
            return faPlusCircle;
        case HttpMethod.Put:
            return faArrowUpRightFromSquare;
        case HttpMethod.Patch:
            return faPen;
        case HttpMethod.Delete:
            return faTrashAlt;
        default:
            return faCode;
    }
};
