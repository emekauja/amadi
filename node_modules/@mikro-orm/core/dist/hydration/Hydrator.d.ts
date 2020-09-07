import { EntityManager } from '..';
import { AnyEntity, EntityData, EntityMetadata, EntityProperty } from '../typings';
import { EntityFactory } from '../entity';
export declare abstract class Hydrator {
    protected readonly factory: EntityFactory;
    protected readonly em: EntityManager;
    constructor(factory: EntityFactory, em: EntityManager);
    hydrate<T extends AnyEntity<T>>(entity: T, meta: EntityMetadata<T>, data: EntityData<T>, newEntity: boolean): void;
    protected abstract hydrateProperty<T extends AnyEntity<T>>(entity: T, prop: EntityProperty, value: EntityData<T>, newEntity: boolean): void;
}
