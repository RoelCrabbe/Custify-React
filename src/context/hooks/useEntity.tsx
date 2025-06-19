import { safeSetList as sharedSafeSetList } from '@lib';
import { useCallback, useEffect, useState } from 'react';

interface EntityWithId {
    id?: number;
}

type EntityOrNull<T> = T | null;

export const useEntity = <T extends EntityWithId>(initialValue?: EntityOrNull<T>) => {
    const [entity, setEntity] = useState<EntityOrNull<T>>(null);

    useEffect(() => {
        setEntity(initialValue ?? null);
    }, [initialValue?.id]);

    const handleUpdate = useCallback((updatedEntity: T) => {
        setEntity((prevEntity) => {
            if (prevEntity?.id === updatedEntity.id) {
                return updatedEntity;
            }
            return prevEntity;
        });
    }, []);

    const handleDelete = useCallback((entityToDelete: T) => {
        setEntity((prevEntity) => {
            if (prevEntity?.id === entityToDelete.id) {
                return null;
            }
            return prevEntity;
        });
    }, []);

    return {
        entity,
        setEntity,
        handleUpdate,
        handleDelete,
    };
};

export const useEntityList = <T extends EntityWithId>(initial: T[] = []) => {
    const [entities, setEntities] = useState<T[]>(initial);

    const handleUpdate = useCallback(
        (updated: T, customUpdater?: (prev: T[], updated: T) => T[]) => {
            setEntities((prev) => {
                if (customUpdater) {
                    return customUpdater(prev, updated);
                }

                const exists = prev.some((item) => item.id === updated.id);
                if (!exists) return [...prev, updated];

                return prev.map((item) => (item.id === updated.id ? updated : item));
            });
        },
        [],
    );

    const handleDelete = useCallback((toDelete: T) => {
        setEntities((prev) => prev.filter((item) => item.id !== toDelete.id));
    }, []);

    const safeSetEntities = useCallback((maybeList: unknown) => {
        sharedSafeSetList<T>(maybeList, setEntities);
    }, []);

    return {
        entities,
        setEntities,
        handleUpdate,
        handleDelete,
        safeSetEntities,
    };
};
