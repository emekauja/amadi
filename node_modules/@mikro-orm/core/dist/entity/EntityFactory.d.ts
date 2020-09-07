import { AnyEntity, EntityData, EntityName, Primary } from '../typings';
import { UnitOfWork } from '../unit-of-work';
import { EntityManager } from '..';
export declare const SCALAR_TYPES: string[];
export declare class EntityFactory {
    private readonly unitOfWork;
    private readonly em;
    private readonly driver;
    private readonly config;
    private readonly metadata;
    private readonly hydrator;
    constructor(unitOfWork: UnitOfWork, em: EntityManager);
    create<T extends AnyEntity<T>>(entityName: EntityName<T>, data: EntityData<T>, initialized?: boolean, newEntity?: boolean): T;
    createReference<T extends AnyEntity<T>>(entityName: EntityName<T>, id: Primary<T> | Primary<T>[] | Record<string, Primary<T>>): T;
    private createEntity;
    /**
     * denormalize PK to value required by driver (e.g. ObjectId)
     */
    private denormalizePrimaryKey;
    /**
     * returns parameters for entity constructor, creating references from plain ids
     */
    private extractConstructorParams;
    private runHooks;
}
